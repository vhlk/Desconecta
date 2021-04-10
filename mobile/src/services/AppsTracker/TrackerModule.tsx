import { NativeModules } from 'react-native';

const { TrackAppsUsageModule } = NativeModules;

interface TrackerInterface {
    GetDaylyTimeForApps(pkgsNames: String[], callback: Function): Object;
    StartDaylyTimeWorkerForApps(pkgsNames: String[], callback: Function): void;
    checkForPermission(): void;
    askForPermission(): void;
}

export default TrackAppsUsageModule as TrackerInterface;