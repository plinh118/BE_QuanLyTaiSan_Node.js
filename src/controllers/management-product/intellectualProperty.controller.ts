import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import {
  AddIntellectualProperty,
  GetIntellectualProperty,
  UpIntellectualProperty,
} from "../../models/IntellectualProperty.model";

export const getIntellectualProperties = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    intellectualPropertyName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetIntellectualProperty>(
      "CALL GetIntellectualPropertiesByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        intellectualPropertyName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bản quyền:", error);
    res.status(500).json({ error: "Không thể lấy danh sách bản quyền." });
  }
};

export const addIntellectualProperty = async (req: Request, res: Response) => {
  const body: AddIntellectualProperty = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;
    const Image = body.IntellectualPropertyImage ? body.IntellectualPropertyImage : null;

    await db_Provider<any>(
      "CALL AddIntellectualProperty(?, ?, ?, ?, ?)",
      [
        body.DepartmentId,
        body.IntellectualPropertyName.trim(),
        Image,
        Description,
        body.IntellectualPropertyStatus,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm bản quyền:", error);
    res.status(500).json({ error: "Không thể thêm bản quyền." });
  }
};

export const updateIntellectualProperty = async (req: Request, res: Response) => {
  const body: UpIntellectualProperty = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID bản quyền" });
    }

    const Description = body.Description ? body.Description.trim() : null;
    const Image = body.IntellectualPropertyImage ? body.IntellectualPropertyImage : null;

    await db_Provider<any>(
      "CALL UpdateIntellectualProperty(?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.DepartmentId,
        body.IntellectualPropertyName.trim(),
        Image,
        Description,
        body.IntellectualPropertyStatus,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật bản quyền:", error);
    res.status(500).json({ error: "Không thể cập nhật bản quyền." });
  }
};

export const deleteIntellectualProperty = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID bản quyền" });
    }

    await db_Provider<any>(
      "CALL DeleteIntellectualProperty(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa bản quyền:", error);
    res.status(500).json({ error: "Không thể xóa bản quyền." });
  }
};