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
    if (!(username && password)) return res.json({ status: "provide username and password" })
    const newUser = await registerModel.create({ username, password })
    const accessToken = newUser.generateAccessToken()
    res.status(200).json({
        message: "Success",
        status: "successfully registered please... login",
        token: accessToken
    })
})

export { register }

const signin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) return res.json({ message: "provide username and password" })
    const existingUser = await registerModel.findOne({ username })
    const accessToken = existingUser.generateAccessToken()
    if (!existingUser) {
        res.json({
            status: "Not Found",
            message: "You are not registered with us"
        })

    }
    else if (await existingUser.isPasswordCorrect(password)) {

        res.status(200).json({ status: "success", message: `Logged In successfully! welcome ${existingUser.username}`, token: accessToken })
    }
    else {
        res.json({
            status: "Incorrect Password",
            message: "Please provide correct password"
        })
    }
})

export { signin }