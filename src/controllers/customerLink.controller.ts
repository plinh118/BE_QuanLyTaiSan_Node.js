// src/controllers/customerLink.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../config/api_Provider";
import { AddCustomer_Link, GetCustomer_Link } from "../models/customer_Linh.model";

// Lấy danh sách liên kết khách hàng
export const getCustomerLinks = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    CustomerName,
    RelatedId,
    RelatedType,
    CustomerId,
    RelatedName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetCustomer_Link>(
      "CALL GetCustomerLinksByPageOrder(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        CustomerName as string | null,
        RelatedId as string | null,
        RelatedType as string | null,
        CustomerId as string | null,
        RelatedName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách liên kết khách hàng:", error);
    res.status(500).json({ error: "Không thể lấy danh sách liên kết khách hàng." });
  }
};

// Thêm liên kết khách hàng mới
export const addCustomerLink = async (req: Request, res: Response) => {
  const body: AddCustomer_Link = req.body;

  try {
    await db_Provider<any>(
      "CALL AddCustomerLink(?, ?, ?)",
      [body.CustomerId, body.RelatedId, body.RelatedType],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm liên kết khách hàng:", error);
    res.status(500).json({ error: "Không thể thêm liên kết khách hàng." });
  }
};

// Xóa liên kết khách hàng
export const deleteCustomerLink = async (req: Request, res: Response) => {
  const body: AddCustomer_Link = req.body;

  try {
    if (!body || !body.CustomerId || !body.RelatedId || !body.RelatedType) {
      return res.status(400).json({ error: "Thiếu thông tin trong request body" });
    }

    await db_Provider<any>(
      "CALL DeleteCustomerLink(?, ?, ?)",
      [body.CustomerId, body.RelatedId, body.RelatedType],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa liên kết khách hàng:", error);
    res.status(500).json({ error: "Không thể xóa liên kết khách hàng." });
  }
};