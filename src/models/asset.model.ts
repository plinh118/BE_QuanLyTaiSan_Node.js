import { RowDataPacket } from "mysql2/promise";
export interface UpAsset_DTO {
  Id:string;
  AssetName:string;
  AssetType:string;
  DivisionId:number;
  PersonnelId:number | null;
  Quantity:number| null;
  Price:number | null;
  StatDate:string | null;
  StatusAsset:string;
  Description:string | null;
  PersonnelName:string | null;
  DivisionName:string | null;
  TotalRecords: number;
}
export interface AddAsset_DTO {
  Id:string;
  AssetName:string;
  AssetType:string;
  Quantity:number| null;
  DivisionId:number;
  PersonnelId:number | null;
  Price:number | null;
  StatDate:string | null;
  StatusAsset:string;
  Description:string | null;
}
export interface GetAsset_DTO extends RowDataPacket{
  Id:string;
  AssetName:string;
  AssetType:string;
  DivisionId:number;
  PersonnelId:number | null;
  Quantity:number| null;
  Price:number | null;
  StatDate:string | null;
  StatusAsset:string;
  Description:string | null;
  PersonnelName:string | null;
  DivisionName:string | null;
  TotalRecords: number;
}
