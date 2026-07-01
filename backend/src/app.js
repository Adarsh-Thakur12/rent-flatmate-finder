import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";


const app= express();

app.use("/api/auth", authRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

export default app;