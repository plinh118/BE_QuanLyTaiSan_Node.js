// src/controllers/asset.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider"; // Điều chỉnh đường dẫn nếu cần
import { executeQuery } from "../../config/db"; // Điều chỉnh đường dẫn nếu cần
import { GetAsset_DTO, AddAsset_DTO, UpAsset_DTO } from "../../models/asset.model";

export const getAssets = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    AssetStatust,
    divisionId,
    assetName,
  } = req.query;
  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetAsset_DTO>(
      "CALL GetAssetsByPageOrder(?, ?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        AssetStatust,
        divisionId,
        assetName,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Error in getAssets:", error);
    res.status(500).json({ error: "Không thể lấy danh sách tài sản." });
  }
};

// Thêm mới asset
export const insertAsset = async (req: Request, res: Response) => {
  const body: AddAsset_DTO = req.body;

  try {
    const PersonnelId = body.PersonnelId ? body.PersonnelId : null;
    const StatDate = body.StatDate ? body.StatDate : null;
    const Description = body.Description ? body.Description.trim() : null;
    const Quantity = body.Quantity ? body.Quantity : null;
    const Price = body.Price ? body.Price : null;

    const existingAsset = await executeQuery<any[]>(
      `SELECT * FROM Asset WHERE Id = "${body.Id.trim()}" AND IsDeleted = 0`,
    );
    if (existingAsset.length > 0) {
      return res.status(200).json({ result: -2 });
    }

    return await db_Provider<any>(
      'CALL InsertAsset(?,?,?,?,?,?,?,?,?,?)',
      [
        body.Id, body.AssetName.trim(),
        body.AssetType.trim(), body.DivisionId, Quantity,
        PersonnelId, Price, StatDate, body.StatusAsset, Description
      ],
      true, res
    );
  } catch (error) {
    console.error("Error in insertAsset:", error);
    res.status(500).json({ error: "Không thể thêm tài sản." });
  }
};

// Cập nhật asset
export const updateAsset = async (req: Request, res: Response) => {
  const body: UpAsset_DTO = req.body;

  try {
    const PersonnelId = body.PersonnelId ? body.PersonnelId : null;
    const StatDate = body.StatDate ? body.StatDate : null;
    const Description = body.Description ? body.Description.trim() : null;
    const Quantity = body.Quantity ? body.Quantity : null;
    const Price = body.Price ? body.Price : null;

    const result = await db_Provider<any>(
      "CALL UpdateAsset(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.AssetName.trim(),
        body.AssetType.trim(),
        body.DivisionId,
        PersonnelId,
        Quantity,
        Price,
        StatDate,
        body.StatusAsset,
        Description,
      ],
      true, res
    );

    res.status(200).json(result); // db_Provider đã gửi res, nhưng nếu không, dùng dòng này
  } catch (error) {
    console.error("Error in updateAsset:", error);
    res.status(500).json({ error: "Không thể cập nhật tài sản." });
  }
};

// Xóa asset
export const deleteAsset = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    const result = await db_Provider<any>("CALL DeleteAsset(?)", [id], true, res);
    res.status(200).json(result); // db_Provider đã gửi res, nhưng nếu không, dùng dòng này
  } catch (error) {
    console.error("Error in deleteAsset:", error);
    res.status(500).json({ error: "Không thể xóa tài sản." });
  }
};