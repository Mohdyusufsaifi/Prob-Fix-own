import { ProductsAllGets,ProductsCreate,ProductUpdateByID,ProductdeletebyId,ProductgetByID } from "../Controllers/Products.js"
import { verifyUser } from "../Middleware/AuthMiddleware.js";
import express from "express";
const router=express.Router();


// router.get("/products",verifyUser,adminOnly,ProductsAllGets)
router.get("/products",verifyUser,ProductsAllGets)
router.get("/products/:id",verifyUser,ProductgetByID)
router.post("/products",verifyUser,ProductsCreate)
router.patch("/products/:id",verifyUser,ProductUpdateByID)
router.delete("/products/:id",verifyUser,ProductdeletebyId)

export default router;
