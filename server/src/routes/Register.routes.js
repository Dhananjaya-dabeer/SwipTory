
import { Router } from "express";
import {  health, register,signin } from "../controllers/User.controllers.js";
import { verifyToken } from "../middlewares/Jwt.middleware.js";

const router = Router()

router.route("/health").get(health)
router.route("/register").post(register)
router.route("/signin").post(signin)



// router.route("/register").post( async (req,res) => {
//         const {username, password} = req.body;
//       const  newUser = await registerModel.create({username, password})
//       const accesstoken = newUser.generateAccessToken()
//       res.json({
//         status: "success",
//         message: "user registered successfully",
//         accesstoken
//       })
// })

export default router