// src/routes/trainingCourseRoutes.ts
import express from "express";
import {
  getTrainingCourses,
  addTrainingCourse,
  updateTrainingCourse,
  deleteTrainingCourse,
} from "../../controllers/management-product/trainingCourse.controller";

const trainingCourseRoutes = express.Router();

trainingCourseRoutes.get("/", getTrainingCourses);
trainingCourseRoutes.post("/", addTrainingCourse);
trainingCourseRoutes.patch("/", updateTrainingCourse);
trainingCourseRoutes.delete("/", deleteTrainingCourse);

export default trainingCourseRoutes;