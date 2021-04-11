import Express from "express"
import controller from '../Repository/ActivityRepository'

const activitiesRoutes = Express.Router()

activitiesRoutes.get("/activity", controller.getAllActivities);

activitiesRoutes.get("/activity/:categoryId", controller.getActivityByID)

activitiesRoutes.get("/activity/:activityId", controller.getActivityByCategoryID)


export = activitiesRoutes;