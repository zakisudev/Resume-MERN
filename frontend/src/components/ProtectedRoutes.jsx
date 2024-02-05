import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = localStorage.getItem('userInfo') ? true : false;
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoutes;
