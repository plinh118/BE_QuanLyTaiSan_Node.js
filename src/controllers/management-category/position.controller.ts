// src/controllers/position.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { executeQuery } from "../../config/db";
import { GetPosition, AddPosistion } from "../../models/position.model";

// Lấy danh sách vị trí
export const getPositions = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    positionName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetPosition>(
      "CALL GetPositionsByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        positionName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách chức vụ:", error);
    res.status(500).json({ error: "Không thể lấy danh sách chức vụ." });
  }
};

// Thêm vị trí mới
export const addPosition = async (req: Request, res: Response) => {
  const body: AddPosistion = req.body;

  try {
    const existingPositions = await executeQuery<any[]>(
      `SELECT * FROM Position WHERE PositionName = ? AND IsDeleted = 0`,
      [body.PositionName.trim()]
    );

    if (existingPositions.length > 0) {
      return res.status(200).json({ result: -1 });
    }

    await db_Provider<any>(
      "CALL AddPosition(?)",
      [body.PositionName.trim()],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm chức vụ:", error);
    res.status(500).json({ error: "Không thể thêm chức vụ." });
  }
};

// Cập nhật vị trí
export const updatePosition = async (req: Request, res: Response) => {
  const body: GetPosition = req.body;

  try {
    const existingPosition = await executeQuery<any[]>(
      `SELECT * FROM Position WHERE PositionName = ? AND Id <> ? AND IsDeleted = 0`,
      [body.PositionName.trim(), body.Id]
    );

    if (existingPosition.length > 0) {
      return res.status(200).json({ result: -1 });
    }

    await db_Provider<any>(
      "CALL UpdatePosition(?, ?)",
      [body.Id, body.PositionName.trim()],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật chức vụ:", error);
    res.status(500).json({ error: "Không thể cập nhật chức vụ." });
  }
};

// Xóa vị trí
export const deletePosition = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    await db_Provider<any>(
      "CALL DeletePosition(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa chức vụ:", error);
    res.status(500).json({ error: "Không thể xóa chức vụ." });
  }
};