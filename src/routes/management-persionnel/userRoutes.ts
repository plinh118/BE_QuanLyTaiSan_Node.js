// src/routes/userRoutes.ts
import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../controllers/management-persionnel/user.controller";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", addUser);
userRoutes.patch("/", updateUser);
userRoutes.delete("/", deleteUser);

export default userRoutes;