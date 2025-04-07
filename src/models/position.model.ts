import { RowDataPacket } from "mysql2/promise";

export interface GetPosition extends RowDataPacket {
  Id: number;
  PositionName: string;
  TotalRecords: number;
}
export interface AddPosistion {
  PositionName: string;
}
