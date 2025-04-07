import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { executeQuery } from '../../config/db';
import { ResultSetHeader } from 'mysql2';

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("dêdede",req.body);

    const { email, password, fullName } = req.body;
    // Validate dữ liệu
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existing = await executeQuery<any[]>('SELECT * FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email đã được sử dụng' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user vào DB
    const result = await executeQuery<ResultSetHeader>(
        "INSERT INTO users (email, password, fullName, role) VALUES (?, ?, ?, 'user')",
        [email, hashedPassword, fullName]
      );

    return res.status(201).json({
      message: 'Đăng ký thành công',
      userId: result.insertId,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Đăng ký thất bại' });
  }
};
