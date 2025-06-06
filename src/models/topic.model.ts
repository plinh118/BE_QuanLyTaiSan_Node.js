import { RowDataPacket } from "mysql2/promise";

export interface GetTopic extends RowDataPacket{
  Id: number;
  TopicName: string;
  DepartmentId: number;
  TopicStartDate: string;
  TopicEndDate: string;
  Description: string | null;
  TopicStatus: string;
  DepartmentName: string;
  CustomerName:string;
  TotalRecords: number;
}

export interface AddTopic {
  TopicName: string;
  DepartmentId: number;
  TopicStartDate: string;
  TopicEndDate: string | null;
  Description: string | null;
  CustomerId:number | null;
  TopicStatus: string;
}

export interface UpTopic {
  Id: number;
  TopicName: string;
  DepartmentId: number;
  TopicStartDate: string;
  TopicEndDate: string | null;
  Description: string | null;
  CustomerId:number | null;
  TopicStatus: string;
}
