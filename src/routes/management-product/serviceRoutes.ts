import express from "express";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../../controllers/management-product/service.controller";

const serviceRoutes = express.Router();

serviceRoutes.get("/", getServices);
serviceRoutes.post("/", addService);
serviceRoutes.patch("/", updateService);
serviceRoutes.delete("/", deleteService);

export default serviceRoutes;