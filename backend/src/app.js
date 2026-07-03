import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();
app.use("/api/booking", bookingRoutes);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/favorites", favoriteRoutes);

export default app;