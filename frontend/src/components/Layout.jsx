import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const Layout = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Layout;
