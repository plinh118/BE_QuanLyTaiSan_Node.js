// src/routes/topicRoutes.ts
import express from "express";
import {
  getTopics,
  addTopic,
  updateTopic,
  deleteTopic,
} from "../../controllers/management-product/topic.controller";

const topicRoutes = express.Router();

topicRoutes.get("/", getTopics);
topicRoutes.post("/", addTopic);
topicRoutes.patch("/", updateTopic);
topicRoutes.delete("/", deleteTopic);

export default topicRoutes;