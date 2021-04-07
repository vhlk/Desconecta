import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

//Select Interests.Category_ID, Category.Name From Interests Join Category On Category.ID = Interests.Category_ID WHERE Interests.User_ID = UserIdInput
//Delete from Interests WHERE Interests.User_ID = UserIdInput AND Interests.Category_ID = CategoryIdInput
//Insert into Interests Values (User_ID, Category_ID) Values (UserIdInput,CategoryIdInput)
export default { };