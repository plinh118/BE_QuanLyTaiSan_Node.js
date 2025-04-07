// src/routes/documentRoutes.ts
import express from "express";
import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../../controllers/management-product/document.controller";

const documentRoutes = express.Router();

documentRoutes.get("/", getDocuments);
documentRoutes.post("/", addDocument);
documentRoutes.patch("/", updateDocument);
documentRoutes.delete("/", deleteDocument);

export default documentRoutes;