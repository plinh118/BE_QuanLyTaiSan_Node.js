import { RowDataPacket } from "mysql2/promise";

export interface Add_Document_DTO {
  DocumentName: string;
  DocumentLink: string;
  RelatedId: number;
  RelatedType: string;
}

export interface Up_Document_DTO extends RowDataPacket {
  Id: number;
  DocumentName: string;
  DocumentLink: string;
  RelatedId: number;
  RelatedType: string;
}
