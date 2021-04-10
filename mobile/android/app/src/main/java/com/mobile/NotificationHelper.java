package com.mobile;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import java.util.Map;

public class NotificationHelper {
    private static final String sChannelId = "appNotification";
    private static final String sChannelName = "Status";
    private static final String sChannelDescription = "Notificações sobre usos e atividades";
    private static final int defaultNotificationId = 0;
    private final Context mContext;

    public NotificationHelper(Context context) {
        mContext = context;
    }

    public void sendNotification(String appName, int time) {
        sendNotification(appName, time, defaultNotificationId);
    }

    public void sendNotification(String appName, int time, int notificationId) {
        NotificationCompat.Builder builder = commomPart()
                .setContentTitle("Aviso de uso do " + appName)
                .setContentText("Você está usando o app " + appName + " além do limite")
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText("Você está usando o app " + appName + "a mais de "+time+" minutos, porque não fazer uma pausa?"));

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(mContext);
        notificationManager.notify(notificationId, builder.build());
    }

    @Deprecated
    public void sendNotification(Map<String, Double> appsTime) {
        StringBuilder text = new StringBuilder();
        for (Map.Entry<String, Double> app2Time : appsTime.entrySet()) {
            text.append("Você está usando o app ").append(app2Time.getKey()).append(" a: ").append(app2Time.getValue()).append(" minutos!").append('\n');
        }

        NotificationCompat.Builder builder = commomPart()
                .setContentTitle("Aviso de uso")
                .setContentText("Você está usando o celular além do limite")
                .setStyle(new NotificationCompat.BigTextStyle().bigText(text));

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(mContext);
        notificationManager.notify(defaultNotificationId, builder.build());
    }

    private NotificationCompat.Builder commomPart() {
        createChannel();

        Intent intent = new Intent(mContext, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(mContext, 0, intent, 0);

        return new NotificationCompat.Builder(mContext, sChannelId)
                .setSmallIcon(R.mipmap.ic_launcher_round)
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_HIGH);
    }

    private void createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(sChannelId, sChannelName, importance);
            channel.setDescription(sChannelDescription);
            NotificationManager notificationManager = mContext.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

    }
}
