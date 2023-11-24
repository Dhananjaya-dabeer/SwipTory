import jwt from "jsonwebtoken"


export const verifyToken =  (req, res, next) => {
    let token = req.headers.authorization

    if(!token){
        return res.json({status: "You are not Authorized!"})
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.verificationToken = verifiedToken
        next()
    } catch (error) {
        return res.json({
            message: "token expired or invalid"
        })
    }
}