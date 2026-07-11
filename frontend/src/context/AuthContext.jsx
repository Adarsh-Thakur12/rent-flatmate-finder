import { createContext, useEffect, useState } from "react";
import { getProfile, loginUser } from "../services/api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const data = await getProfile();

                setUser(data.user);

            } catch (error) {

                localStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    const login = async (credentials) => {

        const data = await loginUser(credentials);

        localStorage.setItem("token", data.token);

        setUser(data.user);

        return data;

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};