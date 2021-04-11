import Express from "express"
import controller from '../Repository/InterestsRepository'

const InterestsRoutes = Express.Router()


InterestsRoutes.get("/interests/:userId", controller.getInterests)

InterestsRoutes.put("/favorites/:userId/:interestsId", controller.insertInterests)

InterestsRoutes.delete("/favorites/:userId/:interestsId", controller.deleteInterests)

export = InterestsRoutes;