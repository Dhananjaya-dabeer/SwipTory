import mongoose from "mongoose";
import { postModel } from "../models/Post.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(
    async (req, res) => {
        const postDetails = req.body;
        
        for (const post of postDetails) {
            const { heading, description, image, category, postCreatedBy} = post
            if (!heading || !description || !image || !category ) {
                return res.json({ code: 400, status: "All fields are mandatory with atleast 3 Slides" })
            };
        }

        try {
            // Use insertMany to insert the array of posts into the database
            await postModel.insertMany(postDetails);

            res.status(200).json({
                message: "Success",
                status: "Successfully added posts!",
                
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error",
                status: "Failed to add posts to the database",
            });
        }
       
    })


export {createPost}

const postDetails = asyncHandler( async(req, res) => {
    const postsInfo = await postModel.find()
    let filter = req.body 
    
    if(filter.category === "Food"){
      
        let filteredResponse = postsInfo.filter((item) => item.category === "food" ) 
        
     return   res.json({
            posts: filteredResponse
       })
    }
    if(filter.category === "HealthAndFitness"){
        let filteredResponse = postsInfo.filter((item) => item.category === "health and fitness" ) 
        return   res.json({
            posts: filteredResponse
       })
    }
    if(filter.category === "travel"){
        let filteredResponse = postsInfo.filter((item) => item.category === "travel" ) 
        return   res.json({
            posts: filteredResponse
       })
    }
    if(filter.category === "movies"){
        let filteredResponse = postsInfo.filter((item) => item.category === "movies" ) 
        return   res.json({
            posts: filteredResponse
       })
    }
    if(filter.category === "education"){
        let filteredResponse = postsInfo.filter((item) => item.category === "education" ) 
        return   res.json({
            posts: filteredResponse
       })
    }
    res.json({ posts: postsInfo})
}) 
export {postDetails}