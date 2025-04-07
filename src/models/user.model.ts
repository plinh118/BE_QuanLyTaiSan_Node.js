import { RowDataPacket } from "mysql2/promise";

export interface GetUser extends RowDataPacket {
  Id: number;
  Email: string;
  Password: string;
  FullName: string;
  Role: 'admin' | 'user';
  Created_at: Date;
  updated_at: Date;
  TotalRecords: number;
}
export interface AddUser {
  Email: string;
  Password: string;
  FullName: string;
  Role: 'admin' | 'user';
}
export interface UpUser {
  Id: number;
  Email: string;
  Password: string;
  FullName: string;
  Role: 'admin' | 'user';
}
