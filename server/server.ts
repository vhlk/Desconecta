import Express from "express"
import Routes from "./routes"
import cors from "cors"

const app = Express()
const port = 3000

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

app.use(Express.json())
app.use(cors())
app.use(Routes)
app.listen(process.env.PORT || port)