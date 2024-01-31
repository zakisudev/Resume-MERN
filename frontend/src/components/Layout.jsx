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
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="h-[100vh-30px] w-full flex flex-col justify-center items-center">
        <Outlet theme={theme} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
