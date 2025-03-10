import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize the userId state from sessionStorage
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

    //set state and sessionStorage
    const login = (id) => {
        sessionStorage.setItem("userId", id);
        setUserId(id);
    };

    // clear state and sessionStorage
    const logout = () => {
        sessionStorage.removeItem("userId");
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
