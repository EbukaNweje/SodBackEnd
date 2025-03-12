const express = require("express")
const Admin = require("../controllers/Admin")
const Middlewares = require("../middlewares/Middlewares")

const Routers = express.Router()

Routers.route("/admin-register").post(Admin.register);
Routers.route("/admin-login").post(Admin.login);
Routers.route("/addProduct").post(Admin.addProduct)
Routers.route("/deleteProduct").delete(Admin.deletedOneProduct)
Routers.route("/updateproduct").patch(Admin.upddataoneProduct)
Routers.route("/admindata/:id").get(Admin.getadmin)



module.exports = Routers
