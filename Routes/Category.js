const express = require("express")
const Cartegory = require("../controllers/Category")


const Router =  express.Router()

Router.route("/createCartegory").post(Cartegory.createCategory)
Router.route("/getallcartegory").get(Cartegory.getAllCategory)
Router.route("/deletecartegory").delete(Cartegory.DeleteCategory)


module.exports = Router
