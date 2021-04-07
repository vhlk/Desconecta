import Express from "express"
import controller from '../Repository/ActivityRepository'

const activitiesRoutes = Express.Router()
//Falta o Activity por Category_ID

activitiesRoutes.get("/activities", controller.getAllActivities);

export = activitiesRoutes;