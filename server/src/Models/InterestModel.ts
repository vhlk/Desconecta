import { BaseCategoryModel, CategoryModel } from './CategoryModel';
import { BaseUserModel, UserModel } from './UserModel';

export interface BaseInterestModel {
  user: BaseUserModel;
  category: BaseCategoryModel;
}

export interface InterestModel extends BaseInterestModel {
  category: CategoryModel;
}
