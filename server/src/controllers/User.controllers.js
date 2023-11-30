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
    const dupkeyVerification = await registerModel.findOne({username})
if(dupkeyVerification){
    res.json({
        status: "Username is alredy used please try to use different!"
    })
}
    const newUser = await registerModel.create({ username, password })
    const accessToken = newUser.generateAccessToken()
    res.status(200).json({
        message: "Success",
        status: "successfully registered and Loggedin!",
        token: accessToken,
        username: newUser.username,
        id: newUser._id
    })
})

export { register }



const signin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) return res.json({ message: "provide username and password" })
    const existingUser = await registerModel.findOne({ username })
    const accessToken = existingUser && existingUser.generateAccessToken() // got null error when i use different name in signin without registering so **existingUser && required**
    if (!existingUser) {
        res.json({
            status: "Not Found",
            message: "You are not registered with us Please.. Register"
        })

    }
    else if (await existingUser.isPasswordCorrect(password)) {

        res.status(200).json({ status: "success", message: `Logged In successfully! welcome ${existingUser.username}`, token: accessToken, username: existingUser.username, id: existingUser._id })
    }
    else {
        res.json({
            status: "Incorrect Password",
            message: "Please provide correct password"
        })
    }
})

export { signin }