import mysql, { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD || "", // Ưu tiên MYSQL_PASSWORD
  database: process.env.MYSQL_DATABASE || "Academi_v4", // Sửa chính tả
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket[] | OkPacket | ResultSetHeader;

export async function executeQuery<T extends QueryResult>(
  query: string,
  params: any[] = []
): Promise<T> {
  const connection = await pool.getConnection();
  try {
    const sanitizedParams = params.map(param => param === undefined ? null : param);
    console.log(`Executing: ${query}`, sanitizedParams); 
    const [rows] = await connection.execute<T>(query, sanitizedParams);
    return rows;
  } catch (error) {
    console.error("Database Error:", {
      query,
      params,
      error: error instanceof Error ? error.message : String(error)
    });
    throw new Error("Database operation failed");
  } finally {
    connection.release();
  }
}

export default pool;