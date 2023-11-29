import { Router } from "express";
import { createPost } from "../controllers/Post.controller.js";

const router = Router()

router.route("/").post(createPost)

export default router