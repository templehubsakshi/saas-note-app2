import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const InviteUser = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member"); // default role

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/invite", { name, email, role });
   
    setName("");
    setEmail("");
  } catch (err) {
    alert(err?.response?.data?.message || "Invite failed");
  }
};

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900 text-white">
      <form
        onSubmit={handleInvite}
        className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-96"
      >
        <h2 className="text-2xl font-bold text-center">Invite User</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">
          Invite
        </button>
      </form>
    </div>
  );
};

export default InviteUser;
