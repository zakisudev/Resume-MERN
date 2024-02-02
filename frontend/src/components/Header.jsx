import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ toggleTheme, theme }) => {
  const token = localStorage.getItem('token');
  return (
    <header className="sticky top-0 w-full h-16 flex flex-wrap gap-5 items-center px-10 bg-secondaryColorDark">
      <Link
        to="/"
        className="px-2 py-1 rounded bg-primaryColorLight font-semibold"
      >
        Home
      </Link>
      {token && (
        <Link
          to="/profile"
          className="top-5 right-5 p-1 bg-primaryColorLight rounded font-semibold "
        >
          Profile
        </Link>
      )}
      <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
    </header>
  );
};

export default Header;
