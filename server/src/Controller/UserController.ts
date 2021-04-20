import Express from "express"
import controller from '../Repository/UserRepository'

const userRoutes = Express.Router()

userRoutes.get("/users", controller.getAllUsers);

userRoutes.put("/users/:name/:email/:password", controller.insertUser);

userRoutes.get("/users/login/:email/:password", controller.userAuth);

userRoutes.get("/users/email/:email", controller.checkIfEmailExists);

userRoutes.get("/users/id/:id", controller.getUserDataByID);

export = userRoutes;