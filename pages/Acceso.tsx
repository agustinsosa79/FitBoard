// src/pages/Login.tsx
import { useState } from "react";
import { signIn } from "../src/firebase/auth"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/");
    } catch {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-800 relative overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="rounded-full shadow-lg border flex items-center justify-center">
        <img
          src="../public/fitcore.png"
          alt="logo-fitboard"
          className="w-24 h-24 object-cover rounded-full"
        />
        </div>
      </div>
      <h2 className="text-center text-2xl font-extrabold mb-2 text-white tracking-wide drop-shadow-lg">
        Iniciar sesión
      </h2>
      <p className="text-center text-gray-400 mb-6 text-sm">
        Bienvenido a <span className="font-bold text-white">fitcore</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-gray-300 mb-2 font-medium" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          className="w-full px-3 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:border-white placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          autoComplete="email"
          required
        />
        </div>
        <div>
        <label className="block text-gray-300 mb-2 font-medium" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:border-white placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          autoComplete="current-password"
          required
        />
        </div>
        <button
        type="submit"
        className="w-full py-2 bg-white text-gray-950 rounded-lg font-bold text-lg shadow-md hover:bg-gray-200 transition-colors duration-200"
        >
        Entrar
        </button>
      </form>
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}