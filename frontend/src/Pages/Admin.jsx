import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="flex w-full flex-col h-[500px] sm:flex-row justify-center items-center">
      <Link
        to="/admin/login"
        className="flex justify-center items-center h-full bg-primaryColorLight w-full sm:w-1/2 hover:bg-primaryVariantColorLight transition-all duration-300 text-4xl uppercase"
      >
        <div>Login</div>
      </Link>
      <Link
        to="/admin/register"
        className="flex justify-center items-center h-full bg-primaryColorDark w-full sm:w-1/2 hover:bg-primaryVariantColorDark transition-all duration-300 text-4xl uppercase"
      >
        <div>Register</div>
      </Link>
    </div>
  );
};

export default Admin;
