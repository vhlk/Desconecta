import Express from "express"

const routes = Express.Router()

routes.get("/", (req, res) => {
    console.log(req.query)
    return res.json([
        {"Páginal": "Inicial :P"},
    ])
})

export default routes