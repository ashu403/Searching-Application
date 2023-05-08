import express from "express";
import searchPost from "../controllers/postControllers";
const route = express.Router();

// Search a post
route.post("/search", searchPost);

export default route;