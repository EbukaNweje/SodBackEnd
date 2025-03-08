const express = require("express")
const Admin = require("../controllers/Admin")
const Middlewares = require("../middlewares/Middlewares")

const Routers = express.Router()

Routers.route("/admin-register").post(Admin.register);
Routers.route("/admin-login").post(Admin.login);
Routers.route("/addProduct", Middlewares.adminauthenticate).post(Admin.addProduct)
Routers.route("/deleteProduct", Middlewares.adminauthenticate).delete(Admin.deletedOneProduct)
Routers.route("/updateproduct", Middlewares.adminauthenticate).patch(Admin.upddataoneProduct)


module.exports = Routers
