import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const ADMIN_UID = "ntPZ8y7lIkWhnQCMaY0rpK4LB8x2";

const AdminRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) return <Navigate to="/login" />;
  if (user.uid !== ADMIN_UID) return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;