// src/controllers/project.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { Add_project, Get_project, Up_project } from "../../models/project.model";

// Lấy danh sách dự án
export const getProjects = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    projectName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<Get_project>(
      "CALL GetProjectByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        projectName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    res.status(500).json({ error: "Không thể lấy danh sách dự án." });
  }
};

// Thêm dự án mới
export const addProject = async (req: Request, res: Response) => {
  const body: Add_project = req.body;

  try {
    const formattedEndDate = body.ProjectEndDate ? body.ProjectEndDate : null;
    const Description = body.Description ? body.Description.trim() : null;
    const Partner = body.PartnerId ? body.PartnerId : null;
    const CustomerId = body.CustomerId ? body.CustomerId : null;

    await db_Provider<any>(
      "CALL AddProject(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.ProjectName.trim(),
        body.DepartmentId,
        Partner,
        Description,
        body.ProjectStartDate,
        formattedEndDate,
        body.ProjectStatus,
        CustomerId,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm dự án:", error);
    res.status(500).json({ error: "Không thể thêm dự án." });
  }
};

// Cập nhật dự án
export const updateProject = async (req: Request, res: Response) => {
  const body: Up_project = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID dự án" });
    }

    const formattedEndDate = body.ProjectEndDate ? body.ProjectEndDate : null;
    const Description = body.Description ? body.Description.trim() : null;
    const Partner = body.PartnerId ? body.PartnerId : null;
    const CustomerId = body.CustomerId ? body.CustomerId : null;

    await db_Provider<any>(
      "CALL UpdateProject(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.ProjectName.trim(),
        body.DepartmentId,
        Partner,
        Description,
        body.ProjectStartDate,
        formattedEndDate,
        body.ProjectStatus,
        CustomerId,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật dự án:", error);
    res.status(500).json({ error: "Không thể cập nhật dự án." });
  }
};

// Xóa dự án
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID dự án" });
    }

    await db_Provider<any>(
      "CALL DeleteProject(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa dự án:", error);
    res.status(500).json({ error: "Không thể xóa dự án." });
  }
};