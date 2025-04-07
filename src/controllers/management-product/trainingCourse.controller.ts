// src/controllers/trainingCourse.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { AddTrainingCourse, GetTrainingCourse, UpTrainingCourse } from "../../models/trainingCourse.api";

// Lấy danh sách khóa học
export const getTrainingCourses = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    trainingCouseName,
    instructorId,
    serviceStatus,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetTrainingCourse>(
      "CALL GetTrainingCoursesByPageOrder(?, ?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        trainingCouseName as string | null,
        instructorId as string | null,
        serviceStatus as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khóa học:", error);
    res.status(500).json({ error: "Không thể lấy danh sách khóa học." });
  }
};

// Thêm khóa học mới
export const addTrainingCourse = async (req: Request, res: Response) => {
  const body: AddTrainingCourse = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;

    await db_Provider<any>(
      "CALL AddTrainingCourse(?, ?, ?, ?, ?)",
      [
        body.CourseName.trim(),
        body.ServiceStatus,
        Description,
        body.Duration,
        body.InstructorId,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm khóa học:", error);
    res.status(500).json({ error: "Không thể thêm khóa học." });
  }
};

// Cập nhật khóa học
export const updateTrainingCourse = async (req: Request, res: Response) => {
  const body: UpTrainingCourse = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID khóa học" });
    }

    const Description = body.Description ? body.Description.trim() : null;

    await db_Provider<any>(
      "CALL UpdateTrainingCourse(?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.CourseName.trim(),
        body.ServiceStatus,
        Description,
        body.Duration,
        body.InstructorId,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật khóa học:", error);
    res.status(500).json({ error: "Không thể cập nhật khóa học." });
  }
};

// Xóa khóa học
export const deleteTrainingCourse = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID khóa học" });
    }

    await db_Provider<any>(
      "CALL DeleteTrainingCourse(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa khóa học:", error);
    res.status(500).json({ error: "Không thể xóa khóa học." });
  }
};