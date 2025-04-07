import { RowDataPacket } from "mysql2/promise";

export interface GetTrainingCourse extends RowDataPacket{
  Id: number;
  CourseName: string;
  ServiceStatus: string;
  Description: string | null;
  Duration: string;
  InstructorId: number;
  InstructorName: string;
  TotalRecords: number;
}

export interface AddTrainingCourse {
  CourseName: string;
  ServiceStatus: string;
  Description: string | null;
  Duration: string;
  InstructorId: number;
}
export interface UpTrainingCourse {
  Id: number;
  CourseName: string;
  ServiceStatus: string;
  Description: string | null;
  Duration: string;
  InstructorId: number;
}
