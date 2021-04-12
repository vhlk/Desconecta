import Express from "express"
import controller from '../Repository/AppTimeLimitRepository'

const appTimeRoutes = Express.Router()

appTimeRoutes.get("/apptime/:userId", controller.getAppTimeUser);

appTimeRoutes.put("/apptime/:userId/:whatsapp/:facebook/:instagram/:twitter/:tiktok", controller.InsertAppTimeUser)

appTimeRoutes.put("/apptime/update/:userId/:whatsapp/:facebook/:instagram/:twitter/:tiktok", controller.UpdateAppTimeUser)


export = appTimeRoutes;