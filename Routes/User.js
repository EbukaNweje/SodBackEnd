const express = require("express")
const User = require("../controllers/User")
const Cart = require("../controllers/AddCart")
const Middlewares = require("../middlewares/Middlewares")

const Routers = express.Router()

Routers.route("/oneuserdata/:userId").get(User.getoneUser)
Routers.route("/addCart", Middlewares).post(Cart.addCart)
Routers.route("/history", Middlewares).get(User.userHistory)


module.exports = Routers
