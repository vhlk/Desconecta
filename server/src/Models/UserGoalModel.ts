import { BaseGoalModel, GoalModel } from './GoalModel';
import { BaseUserModel, UserModel } from './UserModel';

export interface BaseUserGoalModel {
  id: number;
  user: BaseUserModel;
  goal?: BaseGoalModel;
}

export interface UserGoalModel extends BaseUserGoalModel {
  goal: GoalModel;
  name: string;
}
