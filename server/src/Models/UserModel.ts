export interface BaseUserModel {
  id: number;
}

export interface UserModel extends BaseUserModel {
  name: string;
  email: string;
}
