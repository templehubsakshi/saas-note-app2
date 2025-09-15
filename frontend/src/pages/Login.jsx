import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/notes");
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center 
                    bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 
                    relative overflow-hidden">
      
      {/* Background shapes / decorative blur */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-800/80 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-4 transition-transform hover:scale-105 z-10"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Notes SaaS Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
