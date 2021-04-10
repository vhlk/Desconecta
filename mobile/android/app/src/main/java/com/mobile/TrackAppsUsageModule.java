package com.mobile;

import android.annotation.SuppressLint;
import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static android.app.AppOpsManager.MODE_ALLOWED;
import static android.app.AppOpsManager.MODE_DEFAULT;
import static android.app.AppOpsManager.OPSTR_GET_USAGE_STATS;

public class TrackAppsUsageModule extends ReactContextBaseJavaModule {
    private static final String TAG = "TrackAppsUsageModule";
    private static final String SHARED_PREFERENCES = "SharedPreferences";
    private static final String PREFS_PKGS_NAMES = "PrefsPkgNames";
    private static final String WORKER_NAME = "UniqueWorker";

    private ReactApplicationContext mContext;

    TrackAppsUsageModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "TrackAppsUsageModule";
    }

    @ReactMethod
    public void StartDaylyTimeWorkerForApps(ReadableArray pkgsNames, Callback callback) {
        if (!checkForPermission()) {
            callback.invoke("No permission", null);
        }
        if (pkgsNames.size() == 0) {
            return;
        }

        // save pkgs on disk
        Set<String> pkgs = new HashSet<>();
        for (Object namesObj : pkgsNames.toArrayList()) {
            pkgs.add(namesObj.toString());
        }

        SharedPreferences sharedPreferences = mContext.getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor prefsEditor = sharedPreferences.edit();
        prefsEditor.putStringSet(PREFS_PKGS_NAMES, pkgs);
        prefsEditor.apply();

        // start worker to periodic check usage
        OneTimeWorkRequest worker = new OneTimeWorkRequest.Builder(TrackAppsUsageWorker.class).build();
        WorkManager.getInstance(mContext).enqueueUniqueWork(WORKER_NAME, ExistingWorkPolicy.REPLACE, worker);

    }

    @SuppressLint("WrongConstant")
    @ReactMethod
    public void GetDaylyTimeForApps(ReadableArray pkgsNames, Callback callback) {
        if (!checkForPermission()) {
            callback.invoke("No permission", null);
        }

        UsageStatsManager usageStatsManager;
        ;
        if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.LOLLIPOP) {
            usageStatsManager = (UsageStatsManager) mContext.getSystemService(Context.USAGE_STATS_SERVICE);
        } else {
            usageStatsManager = (UsageStatsManager) mContext.getSystemService("usagestats");
        }

        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DATE);
        calendar.set(year, month, day, 0, 0, 0);
        long start = calendar.getTimeInMillis();
        long end = System.currentTimeMillis();
        Log.d(TAG, "Time from start of day(minutes): " + ((end - start) / (1000 * 60.0)));
        Map<String, UsageStats> stats = usageStatsManager.queryAndAggregateUsageStats(start, end);

        List<Object> nameOfPkgs = pkgsNames.toArrayList();

        WritableMap result = Arguments.createMap();
        for (Map.Entry<String, UsageStats> mapUS : stats.entrySet()) {
            if (nameOfPkgs.contains(mapUS.getKey())) {
                result.putDouble(mapUS.getKey(), mapUS.getValue().getTotalTimeInForeground() / (1000 * 60.0));
            }
        }

        callback.invoke(null, result);
    }

    @ReactMethod
    private boolean checkForPermission() {
        AppOpsManager appOps = (AppOpsManager) mContext.getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOps.checkOpNoThrow(OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), mContext.getPackageName());
        return mode == MODE_ALLOWED || mode == MODE_DEFAULT;
    }

    @ReactMethod
    private void askForPermission() {
        Toast.makeText(mContext, "Será necessário conceder permissão para acessar os dados!", Toast.LENGTH_LONG).show();
        Intent settings = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        settings.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(settings);
    }
}
