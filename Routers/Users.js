import {UsergetById,GetallUsers,deleteUser,updateUser,createUser,deleteAllUser} from '../Controllers/Users.js'
import { verifyUser } from '../Middleware/AuthMiddleware.js';
import express from 'express'
const router=express.Router();

router.get('/users',verifyUser,GetallUsers)
router.get('/users/:id',verifyUser,UsergetById)
router.post('/users',verifyUser,createUser)
router.delete('/users/:id',verifyUser,deleteUser)
router.delete('/users',verifyUser,deleteAllUser)
router.patch('/users/:id',verifyUser,updateUser)


export default router;