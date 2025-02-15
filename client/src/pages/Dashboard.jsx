import { useNavigate } from "react-router-dom";

function Dashboard({ setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(false);
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold"></h1>
                <p>Bienvenido al Censo Indigena del Resguardo de Purace</p>
                <button
                    onClick={handleLogout}
                    className="mt-10 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
