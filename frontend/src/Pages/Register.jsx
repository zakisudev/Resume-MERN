import { useEffect, useState } from 'react';
import { register } from '../utils/apis';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const userInfo = localStorage.getItem('userInfo') ? true : false;

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
      const res = await register(data);
      if (res?.status) {
        setLoading(false);
        navigate('/admin/login', {
          replace: true,
          state: { username: data?.username, password: data?.password },
        });
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
        data?.username &&
        data?.email &&
        data?.confirmPassword &&
        data?.password &&
        data?.password === data?.confirmPassword
          ? 'bg-secondaryColorLight/60'
          : 'bg-gray-400'
      } mt-10 p-5 justify-center items-center rounded`}
    >
      <h1 className="text-2xl uppercase text-center my-3 text-gray-800 font-semibold">
        Register
      </h1>

      <form
        onSubmit={handleLogin}
        className="py-5 flex flex-col w-full mx-auto shadow-lg rounded-lg bg-white gap-4"
      >
        <div className="flex flex-col text-xl gap-4">
          <input
            type="text"
            name="username"
            id="username"
            minLength={4}
            value={data?.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800 border-2 border-gray-300 transition-all duration-300 focus:outline-none focus:border-primaryColorLight"
            placeholder="Username"
            required
          />

          <input
            type="email"
            name="email"
            id="email"
            value={data?.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800 border-2 border-gray-300 transition-all duration-300 focus:outline-none focus:border-primaryColorLight"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            value={data?.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800 border-2 border-gray-300 transition-all duration-300 focus:outline-none focus:border-primaryColorLight"
            placeholder="Password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={data?.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800 border-2 border-gray-300 transition-all duration-300 focus:outline-none focus:border-primaryColorLight"
            placeholder="Repeat password"
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={
            loading ||
            !data?.username ||
            !data?.email ||
            !data?.confirmPassword ||
            !data?.password ||
            data?.password !== data?.confirmPassword
          }
          className="w-[80%] mx-auto px-2 py-2 rounded text-center bg-secondaryColorLight/80 hover:bg-secondaryColorLight text-white transition-all duration-300 mt-2 uppercase font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Register'}
        </button>

        <p className="text-center text-textPrimaryLight">
          Already have an account?{' '}
          <Link
            to="/admin/login"
            className="hover:underline hover:text-blue-700 transition-all duration-200 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
