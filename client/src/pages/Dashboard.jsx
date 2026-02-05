import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import BalanceCards from "../components/BalanceCards";
import Transactions from "../components/Transactions";
import { authStatus } from "../service/authApi";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authStatus(); // fetch logged-in user
        setCurrentUser(data);
      } catch (error) {
        toast.error("Failed to fetch user info. Please login again.");
      }
    };

    fetchUser();
  }, []);

  if (!currentUser) return <div>Loading...</div>; // show loading while fetching

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={currentUser} /> {/* Pass currentUser to Navbar */}

      <div className="p-8 max-w-7xl mx-auto">
        <BalanceCards />
        <Transactions />
      </div>
    </div>
  );
};

export default Dashboard;
