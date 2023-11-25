import jwt from "jsonwebtoken"


export const verifyToken =  (req, res, next) => {
    let token = req.headers.authorization

    if(!token){
        return res.json({status: "You are not Authorized!"})
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.verificationToken = verifiedToken
        next()
        res.json({status: "User verified"})
    } catch (error) {
        return res.json({
            status: "token expired or invalid",error
        })
    }
}