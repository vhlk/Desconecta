import { NativeModules } from 'react-native';

const { TrackAppsUsageModule } = NativeModules;

interface TrackerInterface {
    GetDailyTimeForApps(pkgsNames: String[], callback: Function): Object;
    StartDailyTimeWorkerForApps(pkgsNames: String[], pkgsTimes: String[], callback: Function): void;
    CheckForPermission(callback: Function): void;
    AskForPermission(): void;
    StopDailyWorker(): void;
    StartActivity(hora:number, minuto:number, segundo: number): void;
    OpenUrl(url: string): void;
}

export default TrackAppsUsageModule as TrackerInterface;