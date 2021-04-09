import Express from "express"
import controller from '../Repository/ActivityRepository'

const activitiesRoutes = Express.Router()

activitiesRoutes.get("/activity", controller.getAllActivities);

activitiesRoutes.get("/activitiy/:categoryId", controller.getActivityByID)

activitiesRoutes.get("/activitiy/:activityId", controller.getActivityByCategoryID)


export = activitiesRoutes;