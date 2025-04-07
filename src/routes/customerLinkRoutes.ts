import express from "express";
import {
  getCustomerLinks,
  addCustomerLink,
  deleteCustomerLink,
} from "../controllers/customerLink.controller";

const customerLinkRoutes = express.Router();

customerLinkRoutes.get("/", getCustomerLinks);
customerLinkRoutes.post("/", addCustomerLink);
customerLinkRoutes.delete("/", deleteCustomerLink);

export default customerLinkRoutes;