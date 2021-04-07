import Express from "express"
import controller from '../Repository/CategoryRepository'

const categoryRoutes = Express.Router()
//Falta o Category By ID

categoryRoutes.get("/categories", controller.getAllCategories);

export = categoryRoutes;