import Express from "express"
import controller from '../Repository/UserGoalRepository'

const userGoalRoutes = Express.Router()


userGoalRoutes.get("/usergoal/:userId", controller.getUserGoal)

userGoalRoutes.put("/usergoal/:userId/:goalId", controller.insertUserGoal)

userGoalRoutes.delete("/usergoal/:userId/:goalId", controller.deleteUserGoal)

export = userGoalRoutes;