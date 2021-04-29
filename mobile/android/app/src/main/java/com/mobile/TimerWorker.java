package com.mobile;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import java.util.concurrent.TimeUnit;

public class TimerWorker extends Worker {
    private final Context mContext;
    private static final String TAG = "TimerWorker";
    private static final String WORKER_NAME = "TimerWorker";
    private static final String SHARED_PREFERENCES = "SharedPreferences";
    private static final String PREFS_START_TIME_MILLIS = "STARTTIMEMILLIS";
    private static final String PREFS_ACTIVITY_TIME_MILLIS = "TEMPODAATIVIDADEMILLIS";
    private static final String sChannelId = "TIMER";
    private static final String sChannelName = "Atidades em andamento";
    private static final String sChannelDescription = "Descrição sobre as atividades em andamento";
    private static final int sNotificationId = 1;

    public TimerWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        mContext = context;
    }

    @NonNull
    @Override
    public Result doWork() {

        SharedPreferences sharedPreferences = mContext.getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE);
        long startTimeMillis = sharedPreferences.getLong(PREFS_START_TIME_MILLIS, 0);
        long diff = System.currentTimeMillis() - startTimeMillis;
        long activityTime = sharedPreferences.getLong(PREFS_ACTIVITY_TIME_MILLIS, 0);
        Log.d(TAG ,"diff: "+diff);

        if (diff >= activityTime) {
            sendNotification();
        } else {
            // start worker to periodic check usage
            OneTimeWorkRequest worker = new OneTimeWorkRequest.Builder(TimerWorker.class)
                    .setInitialDelay(1, TimeUnit.SECONDS)
                    .build();
            WorkManager.getInstance(mContext).enqueueUniqueWork(WORKER_NAME, ExistingWorkPolicy.REPLACE, worker);
        }

        return Result.success();
    }

    private void sendNotification() {
        NotificationCompat.Builder builder = commomPart()
                .setContentTitle("Status da atividade")
                .setContentText("Atividade concluída!")
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText("Parabéns, você finalizou a atividade! Clique aqui para marcá-la como concluída"));

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(mContext);
        notificationManager.notify(sNotificationId, builder.build());
    }

    private NotificationCompat.Builder commomPart() {
        Intent intent = new Intent(mContext, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(mContext, 0, intent, 0);

        return new NotificationCompat.Builder(mContext, sChannelId)
                .setSmallIcon(R.mipmap.ic_launcher_round)
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_HIGH);
    }
}
