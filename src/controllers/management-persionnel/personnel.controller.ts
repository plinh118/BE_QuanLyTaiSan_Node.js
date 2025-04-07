// src/controllers/personnel.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { AddPersonnel, UpPersonnel, GetPersonnel } from "../../models/persionnel.model";

// Lấy danh sách nhân viên
export const getPersonnel = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    personnelName,
    divisionId,
    positionId,
    workStatus,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<GetPersonnel>(
      "CALL GetPersonnelByPageOrder(?, ?, ?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        personnelName as string | null,
        divisionId as string | null,
        positionId as string | null,
        workStatus as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhân viên:", error);
    res.status(500).json({ error: "Không thể lấy danh sách nhân viên." });
  }
};

// Thêm nhân viên mới
export const addPersonnel = async (req: Request, res: Response) => {
  const body: AddPersonnel = req.body;

  try {
    const formattedEndDate = body.EndDate ? body.EndDate : null;
    const formattedDateOfBirth = body.DateOfBirth ? body.DateOfBirth : null;
    const formattedJoinDate = body.JoinDate ? body.JoinDate : null;
    const Description = body.Description ? body.Description.trim() : null;
    const image = body.Picture ? body.Picture : null;
    const gender = body.Gender ? body.Gender : null;
    const sdt = body.PhoneNumber ? body.PhoneNumber : null;

    await db_Provider<any>(
      "CALL AddPersonnel(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.DivisionId,
        body.PersonnelName.trim(),
        body.PositionId,
        formattedDateOfBirth,
        gender,
        image,
        body.Email.trim(),
        Description,
        sdt,
        formattedJoinDate,
        formattedEndDate,
        body.WorkStatus,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    res.status(500).json({ error: "Không thể thêm nhân viên." });
  }
};

// Cập nhật nhân viên
export const updatePersonnel = async (req: Request, res: Response) => {
  const body: UpPersonnel = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID nhân viên" });
    }

    const formattedEndDate = body.EndDate ? body.EndDate : null;
    const formattedDateOfBirth = body.DateOfBirth ? body.DateOfBirth : null;
    const formattedJoinDate = body.JoinDate ? body.JoinDate : null;
    const Description = body.Description ? body.Description.trim() : null;
    const image = body.Picture ? body.Picture : null;
    const gender = body.Gender ? body.Gender : null;
    const sdt = body.PhoneNumber ? body.PhoneNumber : null;

    await db_Provider<any>(
      "CALL UpdatePersonnel(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.DivisionId,
        body.PersonnelName.trim(),
        body.PositionId,
        formattedDateOfBirth,
        gender,
        image,
        body.Email.trim(),
        Description,
        sdt,
        formattedJoinDate,
        formattedEndDate,
        body.WorkStatus,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật nhân viên:", error);
    res.status(500).json({ error: "Không thể cập nhật nhân viên." });
  }
};

// Xóa nhân viên
export const deletePersonnel = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID nhân viên" });
    }

    await db_Provider<any>(
      "CALL DeletePersonnel(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa nhân viên:", error);
    res.status(500).json({ error: "Không thể xóa nhân viên." });
  }
};