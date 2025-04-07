import { RowDataPacket } from "mysql2/promise";

export interface GetDepartment extends RowDataPacket{
  Id: number;
  DepartmentName: string;
  Description: string | null;
  TotalDivisions: number;
  TotalRecords: number;
}

export interface AddDepartment {
  DepartmentName: string;
  Description: string | null;
}

export interface Department_DTO extends RowDataPacket{
  DepartmentId: number;
  DepartmentName: string;
  Description: string | null;
  TotalDivisions: number;
  TotalRecords: number;
}
