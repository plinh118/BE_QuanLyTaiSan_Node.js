// src/controllers/topic.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { AddTopic, UpTopic, GetTopic } from "../../models/topic.model";

// Lấy danh sách đề tài
export const getTopics = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    topicName,
    departmentId,
    topicStatus,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetTopic>(
      "CALL GetTopicsByPageOrder(?, ?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        topicName as string | null,
        departmentId as string | null,
        topicStatus as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đề tài:", error);
    res.status(500).json({ error: "Không thể lấy danh sách đề tài." });
  }
};

// Thêm đề tài mới
export const addTopic = async (req: Request, res: Response) => {
  const body: AddTopic = req.body;

  try {
    const Description = body.Description ? body.Description.trim() : null;
    const formattedEndDate = body.TopicEndDate ? body.TopicEndDate : null;
    const CustomerId = body.CustomerId ? body.CustomerId : null;

    await db_Provider<any>(
      "CALL AddTopic(?, ?, ?, ?, ?, ?, ?)",
      [
        body.TopicName.trim(),
        body.DepartmentId,
        body.TopicStartDate,
        formattedEndDate,
        Description,
        body.TopicStatus,
        CustomerId,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm đề tài:", error);
    res.status(500).json({ error: "Không thể thêm đề tài." });
  }
};

// Cập nhật đề tài
export const updateTopic = async (req: Request, res: Response) => {
  const body: UpTopic = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID đề tài" });
    }

    const Description = body.Description ? body.Description.trim() : null;
    const formattedEndDate = body.TopicEndDate ? body.TopicEndDate : null;
    const CustomerId = body.CustomerId ? body.CustomerId : null;

    await db_Provider<any>(
      "CALL UpdateTopic(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.TopicName.trim(),
        body.DepartmentId,
        body.TopicStartDate,
        formattedEndDate,
        Description,
        body.TopicStatus,
        CustomerId,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật đề tài:", error);
    res.status(500).json({ error: "Không thể cập nhật đề tài." });
  }
};

// Xóa đề tài
export const deleteTopic = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID đề tài" });
    }

    await db_Provider<any>(
      "CALL DeleteTopic(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa đề tài:", error);
    res.status(500).json({ error: "Không thể xóa đề tài." });
  }
};