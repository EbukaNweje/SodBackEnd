const express = require("express")
const cookkieParser = require("cookie-parser")
const fileUploader = require("express-fileupload")
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const bodyParser = require('body-parser');
const UserRoutes = require("./Routes/User")
const AuthRoutes = require("./Routes/Auth")
const Cartegory = require("./Routes/Category")


const app = express();
app.use(cors("*"));

app.use(fileUploader({
    useTempFiles: true
}))
app.use(cookkieParser())
app.use(express.json());
app.use(bodyParser.json());

// Cloudinary configuration mumu

cloudinary.config({
    cloud_name: 'your-cloud-name',
    api_key: 'your-api-key',
    api_secret: 'your-api-secret'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowed_formats: ['jpg', 'png']
    }
});

const upload = multer({ storage });

app.use("/api", AuthRoutes)
app.use("/api", UserRoutes)
app.use("/api", Cartegory)



app.use("/", (req, res) => {
    res.status(200).send("SOD is a streetwear clothing brand that embodies style, comfort, and sustainability. Our mission is to create versatile pieces that cater to modern lifestyles while prioritizing eco-friendly materials and ethical production practices. With a focus on minimalist designs and attention to detail, SOD offers a unique blend of fashion-forward trends and timeless elegance. SOD has the perfect outfit to express your individuality. Embrace your style with SOD, where fashion meets conscience.")
})

module.exports = app