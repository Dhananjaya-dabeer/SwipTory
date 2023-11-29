import { postModel } from "../models/Post.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(
    async (req, res) => {
        const postDetails = req.body;
        console.log(postDetails)
        for (const post of postDetails) {
            const { heading, description, image, category } = post
            if (!heading || !description || !image || !category) {
                return res.json({ code: 400, status: "All fields are mandatory" })
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