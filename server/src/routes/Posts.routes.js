import { Router } from "express";
import { createPost, postDetails } from "../controllers/Post.controller.js";

const router = Router()

router.route("/").post(createPost)
router.route("/postdetails").get(postDetails)
export default router