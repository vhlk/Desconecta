import Express from "express"
import Routes from "./routes"
import UserRoutes from "./Controller/UserController"
import Config from "./config/config"

const app = Express()
const port = 3000

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

app.use(Express.json())
app.use(Routes)
app.use(UserRoutes)
app.listen(port, () => {
  console.log(`Olha a página http://localhost:${port}`)
})