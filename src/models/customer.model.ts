import { RowDataPacket } from "mysql2/promise";

export interface GetCustomer extends RowDataPacket {
  Id: number;
  CustomerName: string;
  PhoneNumber: string | null;
  Email: string | null;
  Address: string | null;
  CustomerStatut:string;
  TotalRecords: number;
}

export interface AddCustomer {
  Id: number;
  CustomerName: string;
  PhoneNumber: string | null;
  CustomerStatut:string;
  Email: string | null;
  Address: string | null;
}
