import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import { logout } from './../../utils/apis';

const Header = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('userInfo') ? true : false;

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('userInfo');
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 w-full h-16 flex flex-wrap gap-5 items-center px-10 bg-secondaryColorDark">
      <div className="flex justify-between w-full flex-1">
        <Link
          to="/user"
          className="px-2 py-1 rounded bg-primaryColorLight font-semibold"
        >
          Home
        </Link>
        {user ? (
          <div className="flex justify-center items-center gap-3">
            <Link
              to="/profile"
              className="top-5 right-5 p-1 bg-primaryColorLight rounded font-semibold "
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="top-5 right-5 p-1 bg-primaryColorLight rounded font-semibold ml-auto mr-32"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/admin/login"
            className="top-5 right-5 p-1 bg-primaryColorLight rounded font-semibold ml-auto mr-32"
          >
            Login
          </Link>
        )}
      </div>
      <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
    </header>
  );
};

export default Header;
