import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const navClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600 transition";

    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        RentFlate
                    </Link>

                    {/* Desktop Menu */}

                    <div className="hidden md:flex items-center gap-6">

                        <NavLink
                            to="/"
                            className={navClass}
                        >
                            Home
                        </NavLink>

                        {!user && (

                            <>

                                <NavLink
                                    to="/login"
                                    className={navClass}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className={navClass}
                                >
                                    Register
                                </NavLink>

                            </>

                        )}

                        {user?.role === "tenant" && (

                            <>

                                <NavLink
                                    to="/tenant/dashboard"
                                    className={navClass}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/tenant/bookings"
                                    className={navClass}
                                >
                                    Bookings
                                </NavLink>

                                <NavLink
                                    to="/tenant/favorites"
                                    className={navClass}
                                >
                                    Favorites
                                </NavLink>

                                <NavLink
                                    to="/tenant/recommendation"
                                    className={navClass}
                                >
                                    Recommendations
                                </NavLink>

                            </>

                        )}

                        {user?.role === "owner" && (

                            <>

                                <NavLink
                                    to="/owner/dashboard"
                                    className={navClass}
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/owner/add-property"
                                    className={navClass}
                                >
                                    Add Property
                                </NavLink>

                                <NavLink
                                    to="/owner/properties"
                                    className={navClass}
                                >
                                    My Properties
                                </NavLink>

                                <NavLink
                                    to="/owner/bookings"
                                    className={navClass}
                                >
                                    Booking Requests
                                </NavLink>

                            </>

                        )}

                        {user && (

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>

                        )}

                    </div>

                    {/* Mobile Button */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-3xl"
                    >
                        ☰
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            {menuOpen && (

                <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">

                    <NavLink
                        to="/"
                        className={navClass}
                    >
                        Home
                    </NavLink>

                    {!user && (

                        <>

                            <NavLink
                                to="/login"
                                className={navClass}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={navClass}
                            >
                                Register
                            </NavLink>

                        </>

                    )}

                    {user?.role === "tenant" && (

                        <>

                            <NavLink
                                to="/tenant/dashboard"
                                className={navClass}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/tenant/bookings"
                                className={navClass}
                            >
                                Bookings
                            </NavLink>

                            <NavLink
                                to="/tenant/favorites"
                                className={navClass}
                            >
                                Favorites
                            </NavLink>

                            <NavLink
                                to="/tenant/recommendation"
                                className={navClass}
                            >
                                Recommendations
                            </NavLink>

                        </>

                    )}

                    {user?.role === "owner" && (

                        <>

                            <NavLink
                                to="/owner/dashboard"
                                className={navClass}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/owner/add-property"
                                className={navClass}
                            >
                                Add Property
                            </NavLink>

                            <NavLink
                                to="/owner/properties"
                                className={navClass}
                            >
                                My Properties
                            </NavLink>

                            <NavLink
                                to="/owner/bookings"
                                className={navClass}
                            >
                                Booking Requests
                            </NavLink>

                        </>

                    )}

                    {user && (

                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 rounded-lg"
                        >
                            Logout
                        </button>

                    )}

                </div>

            )}

        </nav>

    );

}

export default Navbar;