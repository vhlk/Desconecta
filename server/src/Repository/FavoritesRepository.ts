import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

//Insert Into Favorites(User_ID, Activities_ID) Values (UserIdInput, ActivitiesIdInput)
//Delete from Favorites WHERE Favorites.User_ID = UserIdInput AND Favorites.Activities_ID = ActivitiesIdInput
//Select Favorites.Activities_ID, Activities.Title, Activities.Description, Activities.Duration, Category.Name From Favorites Join Activities On Activities.ID = Favorites.Activities_ID AND Favorites.Activities_ID = ActivitiesIdInput Join Category On Category.ID = Activities.Category_ID WHERE Favorites.User_ID = UserIdInput 
export default { };