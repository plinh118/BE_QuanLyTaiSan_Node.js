// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { GetUser, AddUser, UpUser } from "../../models/user.model";
import { executeQuery } from "../../config/db";
import bcrypt from "bcryptjs";

// Lấy danh sách người dùng
export const getUsers = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    fullName,
    role,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetUser>(
      "CALL GetUsersByPageOrder(?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        fullName as string | null,
        role as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ error: "Không thể lấy danh sách người dùng." });
  }
};

// Thêm người dùng mới
export const addUser = async (req: Request, res: Response) => {
  const body: AddUser = req.body;

  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUsers = await executeQuery<any[]>(
      "SELECT * FROM users WHERE email = ?",
      [body.Email]
    );
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(body.Password, 10);

    await db_Provider<any>(
      "CALL AddUser(?, ?, ?, ?)",
      [body.Email.trim(), hashedPassword, body.FullName.trim(), body.Role],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    res.status(500).json({ error: "Không thể thêm người dùng." });
  }
};

// Cập nhật người dùng
export const updateUser = async (req: Request, res: Response) => {
  const body: UpUser = req.body;

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(body.Password, 10);

    await db_Provider<any>(
      "CALL UpdateUser(?, ?, ?, ?, ?)",
      [body.Id, body.Email.trim(), hashedPassword, body.FullName.trim(), body.Role],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).json({ error: "Không thể cập nhật người dùng." });
  }
};

// Xóa người dùng
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    await db_Provider<any>(
      "CALL DeleteUser(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ error: "Không thể xóa người dùng." });
  }
};