import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import tenantProfileRoutes from "./routes/tenantProfile.routes.js";
import compatibilityRoutes from "./routes/compatibility.routes.js";

const app = express();

// ======================
// Middlewares
// ======================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

// ======================
// Health Check
// ======================
app.get("/test", (req, res) => {

    return res.json({
        success: true,
        message: "Backend is working",
    });

});

// ======================
// Routes
// ======================

// Authentication
app.use(
    "/api/auth",
    authRoutes
);

// Properties
app.use(
    "/api/property",
    propertyRoutes
);

// Bookings
app.use(
    "/api/booking",
    bookingRoutes
);

// Favorites
app.use(
    "/api/favorite",
    favoriteRoutes
);

// Tenant Profile
app.use(
    "/api/profile",
    tenantProfileRoutes
);

// AI Compatibility
app.use(
    "/api/compatibility",
    compatibilityRoutes
);

// ======================
// 404 Handler
// ======================
app.use((req, res) => {

    return res.status(404).json({

        success: false,

        message: "Route not found",

    });

});

export default app;