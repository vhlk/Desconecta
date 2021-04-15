import Express from "express"
import Routes from "./routes"
import UserRoutes from "./Controller/UserController"
import ActivitiesRoutes from "./Controller/ActivityController";
import AppTimeRoutes from "./Controller/AppTimeLimitController";
import CategoryRoutes from "./Controller/CategoryController";
import FavoritesRoutes from "./Controller/FavoritesController";
import GoalsRoutes from "./Controller/GoalsController";
import InterestsRoutes from "./Controller/InterestsController";
import UserActivityRoutes from "./Controller/UserActivityController";
import UserGoalRoutes from "./Controller/UserGoalController";
import Config from "./config/config"

const app = Express()
const port = Config.port

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

app.use(Express.json())
app.use(Routes)
app.use(UserRoutes)
app.use(ActivitiesRoutes);
app.use(AppTimeRoutes);
app.use(CategoryRoutes);
app.use(FavoritesRoutes);
app.use(GoalsRoutes);
app.use(InterestsRoutes);
app.use(UserActivityRoutes);
app.use(UserGoalRoutes); 
app.listen(port, () => {
  console.log(`Olha a página http://localhost:${port}`)
})