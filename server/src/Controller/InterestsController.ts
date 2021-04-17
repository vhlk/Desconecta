import Express from "express"
import controller from '../Repository/InterestsRepository'

const InterestsRoutes = Express.Router()


InterestsRoutes.get("/interests/:userId", controller.getInterests)

InterestsRoutes.put("/interests/:userId/:categoryId", controller.insertInterests)

InterestsRoutes.delete("/interests/:userId/:categoryId", controller.deleteInterests)

export = InterestsRoutes;