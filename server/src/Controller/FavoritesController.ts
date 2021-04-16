import Express from "express"
import controller from '../Repository/FavoritesRepository'

const favoritesRoutes = Express.Router()

favoritesRoutes.get("/favorites/:userId", controller.getUserFavorite)

favoritesRoutes.put("/favorites/:userId/:activityId", controller.insertFavorite)

favoritesRoutes.delete("/favorites/:userId/:activityId", controller.deleteFavorite)

export = favoritesRoutes;