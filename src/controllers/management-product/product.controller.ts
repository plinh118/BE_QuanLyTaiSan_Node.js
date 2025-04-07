// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { db_Provider } from "../../config/api_Provider";
import { Get_Product, Add_Product, Update_Product } from "../../models/product.model";

// Lấy danh sách sản phẩm
export const getProducts = async (req: Request, res: Response) => {
  const {
    pageIndex = "1",
    pageSize = "10",
    orderType = "ASC",
    productName,
  } = req.query;

  try {
    const pageIndexNum = Number(pageIndex) || 1;
    const pageSizeNum = Number(pageSize) || 10;
    const validOrderType = (orderType as string).toUpperCase() === "DESC" ? "DESC" : "ASC";

    await db_Provider<Get_Product>(
      "CALL GetProductsByPageOrder(?, ?, ?, ?)",
      [
        pageIndexNum,
        pageSizeNum,
        validOrderType,
        productName as string | null,
      ],
      false,
      res
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ error: "Không thể lấy danh sách sản phẩm." });
  }
};

// Thêm sản phẩm mới
export const addProduct = async (req: Request, res: Response) => {
  const body: Add_Product = req.body;

  try {
    const formattedEndDate = body.ProductEndDate ? body.ProductEndDate : null;

    await db_Provider<any>(
      "CALL AddProduct(?, ?, ?, ?, ?)",
      [
        body.ProductName.trim(),
        body.DepartmentId,
        body.ProductStartDate,
        formattedEndDate,
        body.ProductStatus,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ error: "Không thể thêm sản phẩm." });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req: Request, res: Response) => {
  const body: Update_Product = req.body;

  try {
    if (!body.Id) {
      return res.status(400).json({ error: "Thiếu ID sản phẩm" });
    }

    const formattedEndDate = body.ProductEndDate ? body.ProductEndDate : null;

    await db_Provider<any>(
      "CALL UpdateProduct(?, ?, ?, ?, ?, ?)",
      [
        body.Id,
        body.ProductName.trim(),
        body.DepartmentId,
        body.ProductStartDate,
        formattedEndDate,
        body.ProductStatus,
      ],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ error: "Không thể cập nhật sản phẩm." });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Thiếu ID sản phẩm" });
    }

    await db_Provider<any>(
      "CALL DeleteProduct(?)",
      [id],
      true,
      res
    );
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ error: "Không thể xóa sản phẩm." });
  }
};