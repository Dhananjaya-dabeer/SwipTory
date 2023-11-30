import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    postCreatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
        
    }
},{timestamps: true})

export const postModel = mongoose.model("Post", postSchema)