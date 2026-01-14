
import React, { useEffect, useState } from "react";
import api from "../api/api"; 
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    group: "",
  });
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // comprobar si es admin
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/"); // redirigir si no es admin
      return;
    }
    // cargar roles desde backend
    api
      .get("/tasks/roles/") // 👈 ahora pega con baseURL http://127.0.0.1:8000/api
      .then((res) => setRoles(res.data))
      .catch(() => setRoles([]));
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks/register/", form);
      alert("Usuario creado con éxito");
      setForm({ username: "", email: "", password: "", group: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error al crear usuario");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="group"
          value={form.group}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona un rol</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
}
