
import { Response } from "express";
import { executeQuery } from "./db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export async function db_Provider<T extends RowDataPacket>(
  query: string,
  params: any[] = [],
  isModification = false,
  res: Response
) {
  try {
    const sanitizedParams = params.map(param => param === undefined ? null : param);
    const data = await executeQuery<T[]>(query, sanitizedParams);
    console.log("đây này",data[0][0])
    if (isModification) {
      if (data[0][0]?.NewId) {
        return res.status(200).json({ result: data[0][0].NewId });
      } else {
        return res.status(200).json({ result: data[0][0].RESULT });
      }
    } else {
      return res.json(data[0]);
    }
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ result: 1, error: "Internal Server Error" });
  }
}