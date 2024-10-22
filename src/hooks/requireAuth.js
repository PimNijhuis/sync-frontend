import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Use the updated useAuth

const requireAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/"); // Redirect to login if not authenticated
      }
    }, [user, navigate]);

    if (!user) {
      return null; // Optionally render a loading spinner or nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default requireAuth;
