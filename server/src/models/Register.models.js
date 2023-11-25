import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
            username: {
                type: String,
                required: true,
            },
            password:{
                type: String,
                required: true,
                trim: true
            }
},{timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.generateAccessToken = function () {
       return jwt.sign(
            {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:  process.env.ACCESS_TOKEN_EXPIRY 
        }
       
        )
    }
export const registerModel = mongoose.model("User", userSchema)