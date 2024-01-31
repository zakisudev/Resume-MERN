import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = ({ toggleTheme, theme }) => {
  return (
    <>
      <div className="theme-switch-wrapper">
        <span
          id="toggle-icon"
          className="flex items-center transition duration-500"
        >
          {theme === 'dark' ? (
            <FaMoon className="text-[30px] mr-[5px]" />
          ) : (
            <FaSun
              className={`${
                theme === 'light' ? 'text-secondaryColorLight' : ''
              } text-[30px] mr-[5px]`}
            />
          )}
        </span>
        <label className="theme-switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <div className="slider round"></div>
        </label>
      </div>
    </>
  );
};

export default DarkModeToggle;
