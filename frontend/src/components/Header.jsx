import DarkModeToggle from './DarkModeToggle';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="static w-full h-16 flex flex-wrap justify-end items-center px-10">
      <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
    </header>
  );
};

export default Header;
