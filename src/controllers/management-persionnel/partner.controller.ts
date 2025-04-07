import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { Partner_DTO, AddPartner_DTO } from "../../models/partners.model";

export const getPartners = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    partnerName,
    phoneNumber
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<Partner_DTO>(
      "CALL GetPartnerByPageOrder(?, ?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        partnerName as string | null,
        phoneNumber as string | null
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đối tác:", error);
    res.status(500).json({ error: "Không thể lấy danh sách đối tác." });
  }
};

export const addPartner = async (req: Request, res: Response) => {
  const body: AddPartner_DTO = req.body;

  try {
    const formattedEndDate = body.EndDate ? body.EndDate : null;
    const phone = body.PhoneNumber ? body.PhoneNumber : null;
    const address = body.Address ? body.Address.trim() : null;
    const Email = body.Email ? body.Email.trim() : null;
    const startDate = body.StartDate ? body.StartDate : null;

    await db_Provider<any>(
      "CALL AddPartner(?, ?, ?, ?, ?, ?, ?)",
      [
        body.PartnerName.trim(),
        phone,
        Email,
        address,
        startDate,
        formattedEndDate,
        body.PartnershipStatus
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm đối tác:", error);
    res.status(500).json({ error: "Không thể thêm đối tác." });
  }
};

export const updatePartner = async (req: Request, res: Response) => {
  const body: Partner_DTO = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID đối tác" });
    }

    const formattedEndDate = body.EndDate ? body.EndDate : null;
    const phone = body.PhoneNumber ? body.PhoneNumber : null;
    const address = body.Address ? body.Address.trim() : null;
    const Email = body.Email ? body.Email.trim() : null;
    const startDate = body.StartDate ? body.StartDate : null;

    await db_Provider<any>(
      "CALL UpdatePartner(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.PartnerName.trim(),
        phone,
        Email,
        address,
        startDate,
        formattedEndDate,
        body.PartnershipStatus
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật đối tác:", error);
    res.status(500).json({ error: "Không thể cập nhật đối tác." });
  }
};

export const deletePartner = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID đối tác" });
    }

    await db_Provider<any>(
      "CALL DeletePartner(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa đối tác:", error);
    res.status(500).json({ error: "Không thể xóa đối tác." });
  }
};