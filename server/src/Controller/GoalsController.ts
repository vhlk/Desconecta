import Express from "express"
import controller from '../Repository/GoalsRepository'

const goalsRoutes = Express.Router()

goalsRoutes.get("/goals", controller.getAllGoals);

export = goalsRoutes;