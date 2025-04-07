// src/controllers/division.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { GetDivision, Division_DTO } from "../../models/division.model";

// Lấy danh sách bộ phận
export const getDivisions = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    divisionName,
    departmentName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetDivision>(
      "CALL GetDivisionByPageOrder(?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        divisionName as string | null,
        departmentName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bộ phận:", error);
    res.status(500).json({ error: "Không thể lấy danh sách bộ phận." });
  }
};

// Thêm bộ phận mới
export const addDivision = async (req: Request, res: Response) => {
  const body: Division_DTO = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    await db_Provider<any>(
      "CALL AddDivision(?, ?, ?)",
      [body.DivisionName.trim(), body.DepartmentId, Description],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm bộ phận:", error);
    res.status(500).json({ error: "Không thể thêm bộ phận." });
  }
};

// Cập nhật bộ phận
export const updateDivision = async (req: Request, res: Response) => {
  const body: Division_DTO = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    await db_Provider<any>(
      "CALL UpdateDivision(?, ?, ?, ?)",
      [body.Id, body.DivisionName.trim(), body.DepartmentId, Description],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật bộ phận:", error);
    res.status(500).json({ error: "Không thể cập nhật bộ phận." });
  }
};

// Xóa bộ phận
export const deleteDivision = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    await db_Provider<any>(
      "CALL DeleteDivision(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa bộ phận:", error);
    res.status(500).json({ error: "Không thể xóa bộ phận." });
  }
};