import Express from "express"
import controller from '../Repository/UserActivityRepository'

const userActivityRoutes = Express.Router()

userActivityRoutes.get("/useractivity/:userId", controller.getUserActivity);

userActivityRoutes.put("/useractivity/:userId/:activityId", controller.insertUserActivity);

userActivityRoutes.delete("/useractivity/:userId/:activityId", controller.deleteUserActivity);

export = userActivityRoutes;