import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

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
import EditProperty from "../pages/owner/EditProperty";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                {/* Public */}

                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />

                <Route
                    path="/property/:id"
                    element={
                        <Layout>
                            <PropertyDetails />
                        </Layout>
                    }
                />

                {/* Tenant */}

                <Route
                    path="/tenant/dashboard"
                    element={
                        <Layout>
                            <TenantDashboard />
                        </Layout>
                    }
                />

                <Route
                    path="/tenant/favorites"
                    element={
                        <Layout>
                            <Favorites />
                        </Layout>
                    }
                />

                <Route
                    path="/tenant/bookings"
                    element={
                        <Layout>
                            <MyBookings />
                        </Layout>
                    }
                />

                <Route
                    path="/tenant/compatibility"
                    element={
                        <Layout>
                            <Compatibility />
                        </Layout>
                    }
                />

                <Route
                    path="/tenant/recommendation"
                    element={
                        <Layout>
                            <Recommendation />
                        </Layout>
                    }
                />

                <Route
                    path="/tenant/chat/:bookingId"
                    element={
                        <Layout>
                            <TenantChat />
                        </Layout>
                    }
                />

                {/* Owner */}

                <Route
                    path="/owner/dashboard"
                    element={
                        <Layout>
                            <OwnerDashboard />
                        </Layout>
                    }
                />

                <Route
                    path="/owner/add-property"
                    element={
                        <Layout>
                            <AddProperty />
                        </Layout>
                    }
                />
                <Route
                    path="/owner/edit-property/:id"
                    element={
                        <Layout>
                            <EditProperty />
                        </Layout>
                    }
                />
                <Route
                    path="/owner/properties"
                    element={
                        <Layout>
                            <MyProperties />
                        </Layout>
                    }
                />

                <Route
                    path="/owner/bookings"
                    element={
                        <Layout>
                            <BookingRequests />
                        </Layout>
                    }
                />

                <Route
                    path="/owner/chat/:bookingId"
                    element={
                        <Layout>
                            <OwnerChat />
                        </Layout>
                    }
                />

                {/* 404 */}

                <Route
                    path="*"
                    element={
                        <Layout>
                            <NotFound />
                        </Layout>
                    }
                />
                
            <Route
                path="/owner/edit-property/:id"
                element={
                    <Layout>
                        <EditProperty />
                    </Layout>
                }
            />
            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;