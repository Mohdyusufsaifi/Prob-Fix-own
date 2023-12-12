import ProductsRouter from "./Routers/Products.js"
import db from "./Database/config.js";
import AuthRouter from "./Routers/Auth.js"
import UsersRouter from "./Routers/Users.js";
import express from "express";
const app=express();
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"

dotenv.config()

// db.sync()
app.use(cors({
    credentials:true,
    origin:'https://azeem-product.netlify.app'
}));

app.use(express.json())
app.use(AuthRouter)
app.use(UsersRouter)
app.use(ProductsRouter)

app.use(bodyParser.urlencoded({ extended: true }));



const Port=process.env.port || 4000



app.listen(Port,console.log(`Server Running This Link:-http://localhost:${Port}`))
