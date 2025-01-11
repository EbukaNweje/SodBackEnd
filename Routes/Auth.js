const express = require("express")
const Auth = require("../controllers/Auth")

const Routers = express.Router()

Routers.route("/register").post(Auth.register)
Routers.route("/login").post(Auth.login)
Routers.route("/changePassword").post(Auth.changepassword)


module.exports = Routers
