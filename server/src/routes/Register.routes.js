
import { Router } from "express";
import { registerModel } from "../models/Register.models.js";
import {  health, register } from "../controllers/User.controllers.js";
const router = Router()

router.route("/health").get(health)
router.route("/register").post(register)



router.route("/register").post( async (req,res) => {
        const {username, password} = req.body;
      const  newUser = await registerModel.create({username, password})
      const accesstoken = newUser.generateAccessToken()
      res.json({
        status: "success",
        message: "user registered successfully",
        accesstoken
      })
})

export default router