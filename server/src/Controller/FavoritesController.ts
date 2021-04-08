import Express from "express"
import controller from '../Repository/FavoritesRepository'

const favoritesRoutes = Express.Router()

favoritesRoutes.get("/favorites", controller.getAllFavorites);

favoritesRoutes.get("/favorites/:userId/:favoriteId", controller.getFavorite)

favoritesRoutes.put("/favorites/:userId/:favoriteId", controller.insertFavorite)

favoritesRoutes.delete("/favorites/:userId/:favoriteId", controller.deleteFavorite)

export = favoritesRoutes;