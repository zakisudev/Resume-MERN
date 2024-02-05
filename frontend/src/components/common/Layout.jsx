import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const user = localStorage.getItem('userInfo') ? true : false;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="w-full flex flex-col justify-center items-center mx-auto h-full">
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
    </div>
  );
};

export default Layout;
