import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
    }
  }, [location.state]);

  return <div>Welcome to Dashboard</div>;
};

export default Dashboard;
