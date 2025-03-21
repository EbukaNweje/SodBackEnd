const express = require("express")
const User = require("../controllers/User")
const Cart = require("../controllers/AddCart")
const Middlewares = require("../middlewares/Middlewares")

const Routers = express.Router()

Routers.route("/oneuserdata/:userId").get(User.getoneUser)
Routers.route("/addCart").post(Middlewares.authenticate, Cart.addCart)
Routers.route("/getCart").get(Middlewares.authenticate, Cart.getCart)
Routers.route("/history").get(User.userHistory)
Routers.route("/allProduct").get(User.allProduct)
Routers.route("/deleteoneUser/:userId").delete(User.deleteoneUser)
Routers.route("/updateoneUser/:userId").patch(User.updateoneUser)
Routers.route("/oneProduct/:id").get(User.getOneProduct)


module.exports = Routers
