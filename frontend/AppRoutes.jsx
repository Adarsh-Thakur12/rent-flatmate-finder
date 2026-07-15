import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PropertyDetails from "../pages/public/PropertyDetails";
import NotFound from "../pages/public/NotFound";

import TenantDashboard from "../pages/tenant/Dashboard";
import Favorites from "../pages/tenant/Favorites";
import MyBookings from "../pages/tenant/MyBookings";
import Compatibility from "../pages/tenant/Compatibility";
import Recommendation from "../pages/tenant/Recommendation";
import TenantChat from "../pages/tenant/Chat";

import OwnerDashboard from "../pages/owner/Dashboard";
import AddProperty from "../pages/owner/AddProperty";
import MyProperties from "../pages/owner/MyProperties";
import BookingRequests from "../pages/owner/BookingRequests";
import OwnerChat from "../pages/owner/Chat";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/property/:id" element={<PropertyDetails />} />

                {/* Tenant */}

                <Route path="/tenant/dashboard" element={<TenantDashboard />} />
                <Route path="/tenant/favorites" element={<Favorites />} />
                <Route path="/tenant/bookings" element={<MyBookings />} />
                <Route path="/tenant/compatibility" element={<Compatibility />} />
                <Route path="/tenant/recommendation" element={<Recommendation />} />
                <Route path="/tenant/chat/:bookingId" element={<TenantChat />} />

                {/* Owner */}

                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/owner/add-property" element={<AddProperty />} />
                <Route path="/owner/properties" element={<MyProperties />} />
                <Route path="/owner/bookings" element={<BookingRequests />} />
                <Route path="/owner/chat/:bookingId" element={<OwnerChat />} />

                {/* 404 */}

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;