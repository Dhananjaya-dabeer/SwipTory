import { registerModel } from "../models/Register.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const health = asyncHandler((req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    })
})

export { health }



const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) return res.json({status : "provide username and password"})
    const newUser = await registerModel.create({ username, password })
    const accessToken = newUser.generateAccessToken()
    res.status(200).json({
        message: accessToken,
        status : "successfully registered"
    })
})

export { register }