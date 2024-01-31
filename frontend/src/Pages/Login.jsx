import { useEffect, useState } from 'react';
import { login } from '../utils/apis';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ user: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      navigate('/profile', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setErrorMsg('');
      const res = await login(data);
      if (res?.status) {
        setLoading(false);
        localStorage.setItem('token', res?.user);
        navigate('/profile', { replace: true });
      } else {
        setLoading(false);
        setErrorMsg(res?.message);
      }
    } catch (error) {
      setErrorMsg(error?.message);
    }
  };

  return (
    <div className="w-[400px] bg-gray-300 p-5 justify-center h-full rounded">
      <h1 className="text-2xl uppercase text-center my-3 text-gray-800 font-semibold">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="py-5 flex flex-col w-full mx-auto"
      >
        <div className="flex flex-col text-xl gap-2 ">
          <input
            type="user"
            name="user"
            id="user"
            value={data?.user}
            onChange={(e) => setData({ ...data, user: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800"
            placeholder="Email or username"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            value={data?.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-[80%] mx-auto px-2 py-1 rounded text-center placeholder:text-gray-500 text-gray-800"
            placeholder="Password"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-center text-lg mt-2 ">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-[80%] mx-auto px-2 py-2 rounded text-center bg-primaryColorLight hover:bg-primaryVariantColorLight text-white transition-all duration-300 my-5 uppercase font-semibold"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
