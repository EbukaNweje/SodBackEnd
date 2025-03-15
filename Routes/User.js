const express = require("express")
const User = require("../controllers/User")
const Cart = require("../controllers/AddCart")
const Middlewares = require("../middlewares/Middlewares")

const Routers = express.Router()

Routers.route("/oneuserdata/:userId").get(User.getoneUser)
Routers.route("/addCart", Middlewares.authenticate).post(Cart.addCart)
Routers.route("/history").get(User.userHistory)
Routers.route("/allProduct").get(User.allProduct)


module.exports = Routers
