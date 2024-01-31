import Profile from '../Pages/Profile';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = localStorage.getItem('token');
  return user ? <Profile /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoutes;
