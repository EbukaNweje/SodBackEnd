const Category = require("../Models/Category")

exports.createCategory =  async (req, res, next) => {
    try {

        const {categoryName} = req.body;
        const newcategoryName = new Category({categoryName})

        await newcategoryName.save()

        res.status(201).json({
            massage: "Category Created Successful",
            data: newcategoryName
        })


    }catch(err){
        next(err)
    }
}

exports.getAllCategory = async (req, res, next) => {
    try {
        const getCartegory = await Category.find()
        
        res.status(201).json({
            message: "All Cartegory",
            maxnumber: getCartegory.length,
            data: getCartegory
        })


    }catch(err){
        next(err)
    }
}

exports.DeleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedCartegory = await Category.findByIdAndDelete(id)

        res.status(200).json({
            message: "Category have been deleted",
            data: deletedCartegory
        })


    }catch(err){
        next(err)
    }
}