import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './components/common/Layout';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './Pages/Profile';
import ResumeEdit from './Pages/ResumeEdit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="" element={<ProtectedRoutes />}>
        <Route path="profile" element={<Profile />} />
        <Route path="resume/:id" element={<ResumeEdit />} />
      </Route>
      <Route path="admin" element={<Admin />} />
      <Route path="admin/login" element={<Login />} />
      <Route path="admin/register" element={<Register />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
