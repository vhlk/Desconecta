package com.mobile;

import android.content.pm.PackageManager;

public class Utils {
    public static String getAppName(String pkgName) {
        switch (pkgName) {
            case "com.android.chrome":
                return "Google Chrome";
            case "com.whatsapp":
                return "WhatsApp";
            case "com.instagram.android":
                return "Instagram";
            case "com.twitter.android":
                return "Twitter";
            case "com.zhiliaoapp.musically":
                return "TikTok";
            case "com.facebook.katana":
                return "Facebook";
            default:
                String[] name = pkgName.split("\\.");
                if (name.length == 2) return name[1];
                if (name.length == 3) return name[2];
                return "<AppName>";
        }
    }

    public static String getPkgName(String appName) throws PackageManager.NameNotFoundException {
        appName = appName.toLowerCase();
        switch (appName) {
            case "google chrome":
            case "chrome":
                return "com.android.chrome";
            case "whatsapp":
                return "com.whatsapp";
            case "instagram":
                return "com.instagram.android";
            case "twitter":
                return "com.twitter.android";
            case "tiktok":
                return "com.zhiliaoapp.musically";
            case "facebook":
                return "com.facebook.katana";
            default:
                throw new PackageManager.NameNotFoundException(appName);
        }
    }
}
