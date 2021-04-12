import Express from "express"
import controller from '../Repository/InterestsRepository'

const InterestsRoutes = Express.Router()


InterestsRoutes.get("/interests/:userId", controller.getInterests)

InterestsRoutes.put("/interests/:userId/:interestsId", controller.insertInterests)

InterestsRoutes.delete("/interests/:userId/:interestsId", controller.deleteInterests)

export = InterestsRoutes;