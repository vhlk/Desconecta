import Express from "express"
import controller from '../Repository/UserRepository'

const userRoutes = Express.Router()

userRoutes.get("/users", controller.getAllUsers);

userRoutes.put("/users/:name/:email/:password", controller.insertUser);

userRoutes.get("/users/:email/:password", controller.userAuth);

export = userRoutes;