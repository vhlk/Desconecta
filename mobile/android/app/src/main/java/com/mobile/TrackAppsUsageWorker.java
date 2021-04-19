package com.mobile;

import android.annotation.SuppressLint;
import android.app.usage.UsageEvents;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class TrackAppsUsageWorker extends Worker {
    private static final String TAG = "TrackAppsUsageWorker";
    private static final String SHARED_PREFERENCES = "SharedPreferences";
    private static final String PREFS_LAST_APP_FOREGROUND = "LastAppOnForeground";
    private static final String PREFS_TIME_FOREGROUND = "TimeOfLastTimeOnForeground";
    private static final String PREFS_TIME_LAST_NOTIFICATION = "TimeOfLastNotification";
    private static final String PREFS_TIMES_PKGS = "PrefsPkgTimes";
    private static final String WORKER_NAME = "UniqueWorker";
    private static final int delayForNextWorker = 10; // segundos
    private Context mContext;

    public TrackAppsUsageWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        mContext = context;
    }

    @NonNull
    @Override
    public Result doWork() {
        GetDaylyTimeForApps();

        // start worker to periodic check usage
        OneTimeWorkRequest worker = new OneTimeWorkRequest.Builder(TrackAppsUsageWorker.class)
                .setInitialDelay(delayForNextWorker, TimeUnit.SECONDS)
                .build();
        WorkManager.getInstance(mContext).enqueueUniqueWork(WORKER_NAME, ExistingWorkPolicy.REPLACE, worker);

        return Result.success();
    }

    @SuppressLint("WrongConstant")
    public void GetDaylyTimeForApps() {

        UsageStatsManager usageStatsManager;
        ;
        if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.LOLLIPOP) {
            usageStatsManager = (UsageStatsManager) mContext.getSystemService(Context.USAGE_STATS_SERVICE);
        } else {
            usageStatsManager = (UsageStatsManager) mContext.getSystemService("usagestats");
        }

        // pegar tempo do inicio do dia ate agora
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DATE);
        calendar.set(year, month, day, 0, 0, 0);
        long start = calendar.getTimeInMillis();
        long end = System.currentTimeMillis();
        Log.d(TAG, "Time from start of day(minutes): " + ( (end - start) / (1000 * 60.0)));
        Map<String, UsageStats> statsByPkg = new HashMap<>();
        List<UsageStats> all = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, start, end);
        calendar.set(year, month, day, 0, 0, 0);
        for (UsageStats us : all) {
            if (calendar.getTimeInMillis() < us.getLastTimeStamp() && calendar.getTimeInMillis() < us.getLastTimeUsed()) {
                if (statsByPkg.containsKey(us.getPackageName())) {
                    statsByPkg.get(us.getPackageName()).add(us);
                }
                else {
                    statsByPkg.put(us.getPackageName(), us);
                }
            }
        }

        SharedPreferences sharedPreferences = mContext.getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE);

        // pegar tempo dos apps que iremos analizar
        Set<String> pkgsTimes = sharedPreferences.getStringSet(PREFS_TIMES_PKGS, new LinkedHashSet<>());

        List<String> nameOfPkgs = new ArrayList<>();
        List<String> appsTimes = new ArrayList<>();

        for (String pkgTime : pkgsTimes) {
            String[] split = pkgTime.split("&");
            nameOfPkgs.add(split[1]);
            appsTimes.add(split[0]);
        }

        Log.d(TAG, "setting pkgs: "+nameOfPkgs);
        Log.d(TAG, "setting times: "+appsTimes);

        //pegar tempo dos apps
        Map<String, Double> result = new HashMap<>();
        for (Map.Entry<String, UsageStats> mapUS : statsByPkg.entrySet()) {
            if (nameOfPkgs.contains(mapUS.getKey())) {
                result.put(mapUS.getKey(), mapUS.getValue().getTotalTimeInForeground() / (1000 * 60.0));
            }
        }

        // pegar app em foreground
        UsageEvents usageEvents = usageStatsManager.queryEvents(start, end);
        Map<String, UsageEvents.Event> lastEventOfPkgName = new HashMap<>();
        while (usageEvents.hasNextEvent()) {
            UsageEvents.Event event = new UsageEvents.Event();
            usageEvents.getNextEvent(event);
            if (nameOfPkgs.contains(event.getPackageName()))
                lastEventOfPkgName.put(event.getPackageName(), event);
        }
        String appForeground = null;
        for (Map.Entry<String, UsageEvents.Event> pkg : lastEventOfPkgName.entrySet()) {
            if (pkg.getValue().getEventType() == UsageEvents.Event.ACTIVITY_RESUMED) {
                appForeground = pkg.getKey();
                Log.d(TAG, "on foreground: " + pkg.getKey());
            }
        }

        // se tiver app em foreground, o tempo nao foi contabilizado
        String lastAppForeground = sharedPreferences.getString(PREFS_LAST_APP_FOREGROUND, null);
        int timeOfLastAppForeground = sharedPreferences.getInt(PREFS_TIME_FOREGROUND, 0);
        SharedPreferences.Editor prefsEditor = sharedPreferences.edit();
        if (appForeground == null) {
            prefsEditor.remove(PREFS_LAST_APP_FOREGROUND);
            prefsEditor.remove(PREFS_TIME_FOREGROUND);
        } else {
            if (lastAppForeground != null && lastAppForeground.equals(appForeground)) {
                timeOfLastAppForeground += delayForNextWorker;
            } else {
                prefsEditor.putString(PREFS_LAST_APP_FOREGROUND, appForeground);
                timeOfLastAppForeground = 0;
            }
            prefsEditor.putInt(PREFS_TIME_FOREGROUND, timeOfLastAppForeground);
        }

        for (Map.Entry<String, Double> res : result.entrySet()) {
            double time = res.getValue();
            if (appForeground != null && res.getKey().equals(appForeground)) {
                time += (timeOfLastAppForeground / 60.0);
            }
            result.put(res.getKey(), time);
            Log.d(TAG, "time for: " + res.getKey() + " = " + time);
        }

        String nameOfForegroundApp = appForeground != null ? Utils.getAppName(appForeground) : "";
        String chosenTimeForegroundApp = "";

        if (appForeground != null) {
            int index = 0;
            for (String pkg : nameOfPkgs) {
                if (appForeground.equals(pkg))
                    break;
                index++;
            }

            for (String time : appsTimes) {
                if (index == 0) {
                    chosenTimeForegroundApp = time;
                    break;
                }
                index--;
            }
        }

        // send notification every 5 min ; TODO: get time from user
        long timeLastNotification = sharedPreferences.getLong(PREFS_TIME_LAST_NOTIFICATION, -1);
        if (appForeground != null && (result.get(appForeground) > Integer.parseInt(chosenTimeForegroundApp)) &&
                (nameOfPkgs.contains(appForeground) && (timeLastNotification == -1 || (System.currentTimeMillis() - timeLastNotification)/(1000*60.0) >= 5))
                || (!Objects.equals(lastAppForeground, appForeground) && nameOfPkgs.contains(appForeground))) // enter app
        {
            Log.d(TAG, "sending notification...");
            NotificationHelper notificationHelper = new NotificationHelper(mContext);
            notificationHelper.sendNotification(nameOfForegroundApp, (int) Math.round(result.get(appForeground)));
            prefsEditor.putLong(PREFS_TIME_LAST_NOTIFICATION, System.currentTimeMillis());
        }
        prefsEditor.apply();

        Log.d(TAG, "--------------------------------------------------------------------------------------------------------");
        // TODO: verificar o limite pra o app e lançar notificação caso precise

    }
}
