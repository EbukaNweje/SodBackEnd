const express = require("express")
const Admin = require("../controllers/Admin")
const Middlewares = require("../middlewares/Middlewares");
const upload = require("../utils/multer");
// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const Routers = express.Router()

Routers.route("/admin-register").post(Admin.register);
Routers.route("/admin-login").post(Admin.login);
Routers.route("/addProduct").post(Middlewares.adminauthenticate, Admin.addProduct)
Routers.route("/deleteProduct/:id").delete(Admin.deletedOneProduct)
Routers.route("/updateproduct/:id").patch(Admin.upddataoneProduct)
Routers.route("/admindata/:id").get(Admin.getadmin)



module.exports = Routers
