import { BaseCategoryModel, CategoryModel } from './CategoryModel';

export interface BaseActivityModel {
  id: number;
}

export interface ActivityModel extends BaseActivityModel {
  category: CategoryModel;
  title: string;
  description: string;
  duration: string;
  linkNetflix: string;
  imageLink: string;
}
