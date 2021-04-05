import { ActivityModel, BaseActivityModel } from './ActivityModel';
import { BaseUserModel, UserModel } from './UserModel';

export interface BaseFavouriteModel {
  user: BaseUserModel;
  activity: BaseActivityModel;
}

export interface FavouriteModel extends BaseFavouriteModel {
  activity: ActivityModel;
}
