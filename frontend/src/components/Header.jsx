import DarkModeToggle from './DarkModeToggle';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header
      className={`${
        theme === 'dark'
          ? 'bg-backgroundDark text-textBackgroundLight'
          : 'bg-backgroundLight text-textBackgroundDark'
      } static w-full h-16 flex flex-wrap justify-end items-center px-10`}
    >
      <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
    </header>
  );
};

export default Header;
