import { RowDataPacket } from "mysql2/promise";

export interface Division_DTO {
  Id: number;
  DivisionName: string;
  DepartmentId: number;
  Description: string | null;
}

export interface GetDivision extends RowDataPacket{
  Id: number;
  DivisionName: string;
  DepartmentId: number;
  DepartmentName: string;
  Description: string | null;
  TotalRecords: number;
}
