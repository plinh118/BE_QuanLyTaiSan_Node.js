import { RowDataPacket } from "mysql2/promise";

export interface Get_Services extends RowDataPacket {
  Id: number;
  ServiceName: string;
  Description: string | null;
  ServiceStatus: string;
  TotalRecords: number;
}
export interface Add_Services {
  ServiceName: string;
  Description: string | null;
  ServiceStatus: string;
}

export interface Update_Services {
  Id: number;
  ServiceName: string;
  Description: string | null;
  ServiceStatus: string;
}
