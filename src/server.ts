// app.js
import express from "express";
import cors from "cors";
import assetRoutes from "./routes/management-product/assetRoutes";
import authRoute from "./routes/authRoute";
import dashboardRoutes from './routes/dashboardRoutes'
import dotenv from "dotenv";
import customerRoutes from './routes/management-persionnel/customer.routes';
import positionRoutes from "./routes/management-category/positionRouter";
import divisionRoutes from "./routes/management-category/divisionRoutes";
import departmentRoutes from "./routes/management-category/departmentRoutes";
import customerLinkRoutes from "./routes/customerLinkRoutes";
import documentRoutes from "./routes/management-product/documentRoutes";
import intellectualPropertyRoutes from "./routes/management-product/intellectualPropertyRoutes";
import partnerRoutes from "./routes/management-persionnel/partnerRoutes";
import personnelRoutes from "./routes/management-persionnel/personnelRoutes";
import productRouter from "./routes/management-product/productRouter";
import serviceRoutes from "./routes/management-product/serviceRoutes";
import topicRoutes from "./routes/management-product/topicRoutes";
import trainingCourseRoutes from "./routes/management-product/trainingCourseRoutes";
import userRoutes from "./routes/management-persionnel/userRoutes";
dotenv.config();

const app = express();

// Cấu hình CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Role"], // Thêm "Role" vào đây
  credentials: true,
};

// Middleware xử lý OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Role");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
  }
  next();
});

// Áp dụng CORS middleware cho tất cả các request
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/asset", assetRoutes);
app.use("/api/auth", authRoute);
app.use('/api/customer', customerRoutes);
app.use('/api/dashBoard', dashboardRoutes);
app.use("/api/customer_Link", customerLinkRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/intellectualProperty", intellectualPropertyRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/personnel", personnelRoutes);
app.use("/api/product", productRouter);
app.use("/api/project", productRouter);
app.use("/api/services", serviceRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/trainingCouse", trainingCourseRoutes);
app.use("/api/user", userRoutes);


app.use("/api/position", positionRoutes);
app.use("/api/division", divisionRoutes);
app.use("/api/department", departmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});