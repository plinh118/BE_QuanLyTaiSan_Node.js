// src/routes/assetRoutes.ts
import express from "express";
import {
  getAssets,
  insertAsset,
  updateAsset,
  deleteAsset,
} from "../../controllers/management-product/asset.controller";

const router = express.Router();

// Định nghĩa các endpoint RESTful
router.get("/", getAssets);
router.post("/", insertAsset);
router.patch("/", updateAsset); 
router.delete("/", deleteAsset);

export default router;