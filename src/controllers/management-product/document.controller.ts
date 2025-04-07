import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { Add_Document_DTO, Up_Document_DTO } from "../../models/document.model";

export const getDocuments = async (req: Request, res: Response) => {
  const { relatedId, relatedType } = req.query;

  try {
    const relatedIdNum = Number(relatedId);

    await db_Provider<Up_Document_DTO>(
      "CALL GetDocuments_by_IdRelated(?, ?)",
      [relatedIdNum, relatedType as string | undefined],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài liệu:", error);
    res.status(500).json({ error: "Không thể lấy danh sách tài liệu." });
  }
};

// Thêm tài liệu mới
export const addDocument = async (req: Request, res: Response) => {
  const body: Add_Document_DTO = req.body;

  try {
    await db_Provider<any>(
      "CALL AddDocument(?, ?, ?, ?)",
      [
        body.DocumentName.trim(),
        body.DocumentLink.trim(),
        body.RelatedId,
        body.RelatedType,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm tài liệu:", error);
    res.status(500).json({ error: "Không thể thêm tài liệu." });
  }
};

// Cập nhật tài liệu
export const updateDocument = async (req: Request, res: Response) => {
  const body: Up_Document_DTO = req.body;

  try {
    await db_Provider<any>(
      "CALL UpdateDocument(?, ?, ?, ?, ?)",
      [
        body.Id,
        body.DocumentName.trim(),
        body.DocumentLink.trim(),
        body.RelatedId,
        body.RelatedType,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật tài liệu:", error);
    res.status(500).json({ error: "Không thể cập nhật tài liệu." });
  }
};

// Xóa tài liệu
export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    await db_Provider<any>(
      "CALL DeleteDocument(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa tài liệu:", error);
    res.status(500).json({ error: "Không thể xóa tài liệu." });
  }
};