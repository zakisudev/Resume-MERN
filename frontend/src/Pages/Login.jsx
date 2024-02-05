import { useEffect, useState } from 'react';
import { login } from '../utils/apis';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  let username, password;
  if (location.state) {
    ({ username, password } = location.state);
  }

  const navigate = useNavigate();
  const [data, setData] = useState({
    user: username || '',
    password: password || '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const userInfo = localStorage.getItem('userInfo');

  useEffect(() => {
    if (userInfo) {
      navigate('/user', { replace: true });
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setErrorMsg('');
      const res = await login(data);
      if (res?.status) {
        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(res?.user));
        navigate('/user', { replace: true });
      } else {
        setLoading(false);
        setErrorMsg(res?.message);
      }
    } catch (error) {
      setErrorMsg(error?.message);
    }
  };

  return (
    <div
      className={`w-[400px] ${
        (data?.user && data?.password) || (username && password)
          ? 'bg-primaryColorLight/70'
          : 'bg-gray-400'
      } mt-10 p-5 justify-center items-center rounded`}
    >
      <h1 className="text-2xl uppercase text-center my-3 text-gray-800 font-semibold">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="py-5 flex flex-col w-full mx-auto shadow-lg rounded-lg bg-white gap-4"
      >
        <div className="flex flex-col text-xl gap-4">
          <input
            type="text"
            name="user"
            id="user"
            value={data?.user || ''}
            onChange={(e) => setData({ ...data, user: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800 border-2 border-gray-300 transition-all duration-300 focus:outline-none focus:border-primaryColorLight"
            placeholder="Email or username"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            value={data?.password || ''}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800 border-2 border-gray-300 transition-all duration-300 focus:outline-none focus:border-primaryColorLight"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex w-[80%] justify-between items-center mx-auto text-textPrimaryLight">
          <label htmlFor="remember" className="text-sm">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="mr-1 w-5 rounded border-none outline-none transition-all duration-300"
            />
            Remember me
          </label>
          <Link
            href="/"
            className="hover:underline hover:text-blue-700 transition-all duration-200"
          >
            Forgot password?
          </Link>
        </div>

        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={
            loading ||
            (!data?.user && !username) ||
            (!data?.password && !password)
          }
          className="w-[80%] mx-auto px-2 py-2 rounded text-center bg-primaryColorLight hover:bg-primaryVariantColorLight text-white transition-all duration-300 mt-2 uppercase font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="text-center text-textPrimaryLight">
          Don't have an account?{' '}
          <Link
            to="/admin/register"
            className="hover:underline hover:text-blue-700 transition-all duration-200 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
