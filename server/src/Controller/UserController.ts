import Express from "express"
import controller from '../Repository/UserRepository'

const userRoutes = Express.Router()

userRoutes.get("/users", controller.getAllUsers);

export = userRoutes;