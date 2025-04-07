import express from "express";
import { Login } from "../controllers/auth/login";
import { registerUser } from "../controllers/auth/register";
const authRoute = express.Router();

authRoute.post("/login", Login);
authRoute.post("/register", registerUser);
export default authRoute;
