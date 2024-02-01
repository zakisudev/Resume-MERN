import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="sticky top-0 w-full h-16 flex flex-wrap justify-between items-center px-10 bg-secondaryColorDark">
      <Link
        to="/"
        className="px-2 py-1 rounded bg-primaryColorLight font-semibold"
      >
        Home
      </Link>
      <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
    </header>
  );
};

export default Header;
