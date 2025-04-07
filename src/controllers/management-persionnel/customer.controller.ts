// src/controllers/customer.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { GetCustomer, AddCustomer } from "../../models/customer.model";

// Lấy danh sách khách hàng
export const getCustomers = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    customerName,
    phoneNumber,
    customerStatut,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetCustomer>(
      "CALL GetCustomerByPageOrder(?, ?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        customerName as string | null,
        phoneNumber as string | null,
        customerStatut as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    res.status(500).json({ error: "Không thể lấy danh sách khách hàng." });
  }
};

// Thêm khách hàng mới
export const addCustomer = async (req: Request, res: Response) => {
  const body: AddCustomer = req.body;

  try {
    const Phone = body.PhoneNumber ? body.PhoneNumber.trim() : null;
    const Email = body.Email ? body.Email.trim() : null;
    const Address = body.Address ? body.Address.trim() : null;

    await db_Provider<any>(
      "CALL AddCustomer(?, ?, ?, ?, ?)",
      [body.CustomerName.trim(), Phone, Email, Address, body.CustomerStatut],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
    res.status(500).json({ error: "Không thể thêm khách hàng." });
  }
};

// Cập nhật khách hàng
export const updateCustomer = async (req: Request, res: Response) => {
  const body: GetCustomer = req.body;

  try {
    const Phone = body.PhoneNumber ? body.PhoneNumber.trim() : null;
    const Email = body.Email ? body.Email.trim() : null;
    const Address = body.Address ? body.Address.trim() : null;

    await db_Provider<any>(
      "CALL UpdateCustomer(?, ?, ?, ?, ?, ?)",
      [body.Id, body.CustomerName.trim(), Phone, Email, Address, body.CustomerStatut],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật khách hàng:", error);
    res.status(500).json({ error: "Không thể cập nhật khách hàng." });
  }
};

// Xóa khách hàng
export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID khách hàng" });
    }

    await db_Provider<any>(
      "CALL DeleteCustomer(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa khách hàng:", error);
    res.status(500).json({ error: "Không thể xóa khách hàng." });
  }
};