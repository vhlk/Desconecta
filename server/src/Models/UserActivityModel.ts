import { ActivityModel } from './ActivityModel';
import { BaseUserModel } from './UserModel';

export interface BaseUserActivityModel {
  id: number;
  user: BaseUserModel;
}

export interface UserActivityModel extends BaseUserActivityModel {
  day: string;
  activity: ActivityModel;
}
