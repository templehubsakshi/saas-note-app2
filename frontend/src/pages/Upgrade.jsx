import { useAuth } from "../auth/AuthContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Upgrade = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      await API.post(`/tenants/${user.tenant}/upgrade`);
      alert("Tenant upgraded to Pro!");
      navigate("/notes");
      window.location.reload();
    } catch {
      alert("Upgrade failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-gray-900 text-white p-8 rounded shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Upgrade Plan</h2>
        <p className="mb-6">Your free plan limit reached. Upgrade to Pro for unlimited notes.</p>
        <button
          onClick={handleUpgrade}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default Upgrade;
