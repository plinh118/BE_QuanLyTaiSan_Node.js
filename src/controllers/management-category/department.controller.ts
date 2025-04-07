// src/controllers/department.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { executeQuery } from "../../config/db";
import { GetDepartment, AddDepartment, Department_DTO } from "../../models/department.model";

// Lấy danh sách đơn vị
export const getDepartments = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    departmentName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<Department_DTO>(
      "CALL GetDepartmentByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        departmentName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn vị:", error);
    res.status(500).json({ error: "Không thể lấy danh sách đơn vị." });
  }
};

// Thêm đơn vị mới
export const addDepartment = async (req: Request, res: Response) => {
  const body: AddDepartment = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    const existingDepartments = await executeQuery<any[]>(
      `SELECT * FROM Department WHERE DepartmentName = ? AND IsDeleted = 0`,
      [body.DepartmentName.trim()]
    );

    if (existingDepartments.length > 0) {
      return res.status(200).json({ result: -1 });
    }

    await db_Provider<any>(
      "CALL AddDepartment(?, ?)",
      [body.DepartmentName.trim(), Description],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm đơn vị:", error);
    res.status(500).json({ error: "Không thể thêm đơn vị." });
  }
};

// Cập nhật đơn vị
export const updateDepartment = async (req: Request, res: Response) => {
  const body: GetDepartment = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    const existingDepartment = await executeQuery<any[]>(
      `SELECT * FROM Department WHERE DepartmentName = ? AND Id <> ? AND IsDeleted = 0`,
      [body.DepartmentName.trim(), body.Id]
    );

    if (existingDepartment.length > 0) {
      return res.status(200).json({ result: -1 });
    }

    await db_Provider<any>(
      "CALL UpdateDepartment(?, ?, ?)",
      [body.Id, body.DepartmentName.trim(), Description],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn vị:", error);
    res.status(500).json({ error: "Không thể cập nhật đơn vị." });
  }
};

// Xóa đơn vị
export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    await db_Provider<any>(
      "CALL DeleteDepartment(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa đơn vị:", error);
    res.status(500).json({ error: "Không thể xóa đơn vị." });
  }
};