// src/routes/departmentRoutes.ts
import express from "express";
import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../controllers/management-category/department.controller";

const departmentRoutes = express.Router();

departmentRoutes.get("/", getDepartments);
departmentRoutes.post("/", addDepartment);
departmentRoutes.patch("/", updateDepartment);
departmentRoutes.delete("/", deleteDepartment);

export default departmentRoutes;