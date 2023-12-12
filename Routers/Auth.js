import { Login, Me,Logout} from "../Controllers/Auth.js";
import express from "express";
import { createUser } from "../Controllers/Users.js";
const router=express.Router();

router.post('/SignUp',createUser);
router.post("/login",Login);
router.get("/me",Me);
router.delete("/logout",Logout);

export default router;