
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export function DashboardPage({ setUser }) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(false); // Desautenticar al usuario
    };

    return (
        <div>
            <Navbar onLogout={handleLogout} /> {/* Pasamos la función de logout */}
            <Sidebar />
            <div className="ml-64 p-4 mt-16">
                <Outlet /> {/* Aquí se renderizarán las páginas hijas */}
            </div>
        </div>
    );
}

