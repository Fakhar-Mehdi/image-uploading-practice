import express from "express";
import { saveUser } from "../controllers/signup";
const signupRouter = express.Router();

signupRouter.post("/saveCredentials", saveUser);

export default signupRouter;
