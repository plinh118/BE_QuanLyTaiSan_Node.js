// src/controllers/consultation.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import {
  GetConsult,
  AddConsultationDto,
  UpdateConsultationDto,

} from "../../models/consultation.model";

// Lấy danh sách đăng ký tư vấn phân trang
export const getConsultations = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    searchText,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetConsult>(
      "CALL GetConsultationsByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        searchText as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đăng ký tư vấn:", error);
    res.status(500).json({ error: "Không thể lấy danh sách đăng ký tư vấn." });
  }
};


// Thêm đăng ký tư vấn mới
export const addConsultation = async (req: Request, res: Response) => {
  const body: AddConsultationDto = req.body;

  try {
    const fullName = body.FullName ? body.FullName.trim() : null;
    const phoneNumber = body.PhoneNumber ? body.PhoneNumber.trim() : null;
    const email = body.Email ? body.Email.trim() : null;
    const relatedId = body.RelatedId ?? null;
    const relatedType = body.RelatedType ?? null;
    const description = body.Description ? body.Description.trim() : null;

    if (!fullName || !phoneNumber || !email) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc: Họ tên, số điện thoại, email." });
    }

    await db_Provider<any>(
      "CALL AddConsultation(?, ?, ?, ?, ?, ?,?)",
      [
        fullName,
        phoneNumber,
        email,
        relatedId,
        relatedType,
        description,
        body.Status,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm đăng ký tư vấn:", error);
    res.status(500).json({ error: "Không thể thêm đăng ký tư vấn." });
  }
};

// Cập nhật đăng ký tư vấn
export const updateConsultation = async (req: Request, res: Response) => {
  const body: UpdateConsultationDto = req.body;

  try {
    console.log(body);
    const fullName = body.FullName ? body.FullName.trim() : null;
    const phoneNumber = body.PhoneNumber ? body.PhoneNumber.trim() : null;
    const email = body.Email ? body.Email.trim() : null;
    const relatedId = body.RelatedId ?? null;
    const relatedType = body.RelatedType ?? null;
    const description = body.Description ? body.Description.trim() : null;
    if (!body.Consult_Id) {
      return res.status(400).json({ error: "Thiếu ID đăng ký tư vấn" });
    }

    if (!fullName || !phoneNumber || !email) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc: Họ tên, số điện thoại, email." });
    }

    await db_Provider<any>(
      "CALL UpdateConsultation(?, ?, ?, ?, ?, ?, ?,?)",
      [
        body.Consult_Id,
        fullName,
        phoneNumber,
        email,
        relatedId,
        relatedType,
        description,
        body.Status
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật đăng ký tư vấn:", error);
    res.status(500).json({ error: "Không thể cập nhật đăng ký tư vấn." });
  }
};

// Xóa đăng ký tư vấn
export const deleteConsultation = async (req: Request, res: Response) => {
    const { id } = req.query; 
    console.log("Query params:", req.query);
  
    try {
      if (!id) {
        return res.status(400).json({ error: "Thiếu ID đăng ký tư vấn" });
      }
  
      await db_Provider<any>(
        "CALL DeleteConsultation(?)",
        [id], // Sử dụng id thay vì Consult_Id
        true,
        res
      );
    } catch (error) {
      console.error("Lỗi khi xóa đăng ký tư vấn:", error);
      res.status(500).json({ error: "Không thể xóa đăng ký tư vấn." });
    }
  };