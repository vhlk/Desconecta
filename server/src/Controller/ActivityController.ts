import Express from "express"
import controller from '../Repository/ActivityRepository'

const activitiesRoutes = Express.Router()

activitiesRoutes.get("/activity", controller.getAllActivities);

activitiesRoutes.get("/activity/:activityId", controller.getActivityByID)

// activitiesRoutes.get("/activity/:categoryId", controller.getActivityByCategoryID)


export = activitiesRoutes;