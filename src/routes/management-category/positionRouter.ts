// src/routes/positionRoutes.ts
import express from "express";
import {
  getPositions,
  addPosition,
  updatePosition,
  deletePosition,
} from "../../controllers/management-category/position.controller";

const positionRoutes = express.Router();

// Định nghĩa các endpoint RESTful
positionRoutes.get("/", getPositions);
positionRoutes.post("/", addPosition);
positionRoutes.patch("/", updatePosition);
positionRoutes.delete("/", deletePosition);

export default positionRoutes;