import Express from "express"
import controller from '../Repository/CategoryRepository'

const categoryRoutes = Express.Router()

categoryRoutes.get("/categories", controller.getAllCategories);

categoryRoutes.get("/categories/:categoryId", controller.getCategoryById);


export = categoryRoutes;