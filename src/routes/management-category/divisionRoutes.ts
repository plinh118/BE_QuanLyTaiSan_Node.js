// src/routes/divisionRoutes.ts
import express from "express";
import {
  getDivisions,
  addDivision,
  updateDivision,
  deleteDivision,
} from "../../controllers/management-category/division.controller";

const divisionRoutes = express.Router();

// Định nghĩa các endpoint RESTful
divisionRoutes.get("/", getDivisions);
divisionRoutes.post("/", addDivision);
divisionRoutes.patch("/", updateDivision);
divisionRoutes.delete("/", deleteDivision);

export default divisionRoutes;