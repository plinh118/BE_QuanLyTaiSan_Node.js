// src/routes/projectRoutes.ts
import express from "express";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../../controllers/management-product/project.controller";

const projectRoutes = express.Router();

projectRoutes.get("/", getProjects);
projectRoutes.post("/", addProject);
projectRoutes.patch("/", updateProject);
projectRoutes.delete("/", deleteProject);

export default projectRoutes;