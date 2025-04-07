// src/controllers/service.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { Add_Services, Update_Services, Get_Services } from "../../models/services.model";

// Lấy danh sách dịch vụ
export const getServices = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    serviceName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<Get_Services>(
      "CALL GetServicesByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        serviceName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ:", error);
    res.status(500).json({ error: "Không thể lấy danh sách dịch vụ." });
  }
};

// Thêm dịch vụ mới
export const addService = async (req: Request, res: Response) => {
  const body: Add_Services = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    await db_Provider<any>(
      "CALL AddService(?, ?, ?)",
      [body.ServiceName.trim(), Description, body.ServiceStatus],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm dịch vụ:", error);
    res.status(500).json({ error: "Không thể thêm dịch vụ." });
  }
};

// Cập nhật dịch vụ
export const updateService = async (req: Request, res: Response) => {
  const body: Update_Services = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    await db_Provider<any>(
      "CALL UpdateService(?, ?, ?, ?)",
      [body.Id, body.ServiceName.trim(), Description, body.ServiceStatus],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật dịch vụ:", error);
    res.status(500).json({ error: "Không thể cập nhật dịch vụ." });
  }
};

// Xóa dịch vụ
export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    await db_Provider<any>(
      "CALL DeleteService(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa dịch vụ:", error);
    res.status(500).json({ error: "Không thể xóa dịch vụ." });
  }
};