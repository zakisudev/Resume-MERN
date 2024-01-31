import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../utils/apis';
import { FaHome, FaPrint, FaTrash, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const user = localStorage.getItem('token');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getMe(user);
      if (!res?.status && !user) {
        navigate('/admin/login', { replace: true });
      }
      setProfile(res?.profile);
    };
    fetchProfile();
  }, []);

  return (
    <>
      {user && profile && (
        <div className="flex flex-col w-[90%] gap-3">
          <div className="flex justify-center items-center w-full mx-auto rounded-lg h-36 bg-gradient-to-r from-primaryColorLight/60 to-primaryVariantColorDark/60">
            <img
              src={profile?.avatar}
              alt="avatar"
              className="object-cover mx-auto w-20 h-20 rounded-full"
            />
          </div>
          <div className="flex justify-between items-center flex-col sm:flex-row w-full md:w-[90%] mx-auto gap-4">
            <Link
              to="/"
              type="button"
              className="px-3 py-1 transition-all duration-300 ease-in-out hover:bg-primaryColorLight/80 hover:scale-105 rounded flex items-center justify-center gap-2"
            >
              <FaHome className="text-xl" />
            </Link>

            <button
              type="button"
              className="px-3 py-1 bg-primaryColorLight rounded flex w-full sm:w-auto items-center justify-center gap-2 text-textPrimaryDark hover:bg-primaryColorLight/80 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FaPrint />{' '}
              <span className="whitespace-nowrap text-md sm:text-xl">
                Edit Resume
              </span>
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-secondaryColorDark rounded flex w-full sm:w-auto items-center justify-center gap-2 text-textPrimaryDark hover:bg-secondaryColorDark/80 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FaUser />{' '}
              <span className="whitespace-nowrap text-md sm:text-xl">
                Edit Profile
              </span>
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-red-700 rounded flex items-center justify-center w-full sm:w-auto gap-2 text-textPrimaryDark hover:bg-red-900 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FaTrash />{' '}
              <span className="whitespace-nowrap text-md sm:text-xl">
                Delete Account
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-[400px] mx-auto">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-xl">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={profile?.username}
                className="w-full rounded px-2 py-1 border border-gray-400"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xl">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile?.email}
                className="w-full rounded px-2 py-1 border border-gray-400"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-xl">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={profile?.username}
                className="w-full rounded px-2 py-1 border border-gray-400"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="registerDate" className="text-xl">
                Member since
              </label>
              <input
                type="text"
                name="registerDate"
                id="registerDate"
                value={
                  profile?.createdAt
                    ? format(new Date(profile.createdAt), 'MMMM d, yyyy')
                    : ''
                }
                className="w-full rounded px-2 py-1 border border-gray-400"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profileActivity" className="text-xl">
                Last activity
              </label>
              <input
                type="text"
                name="profileActivity"
                id="profileActivity"
                value={
                  profile?.updatedAt
                    ? format(new Date(profile.updatedAt), 'MMMM d, yyyy')
                    : ''
                }
                className="w-full rounded px-2 py-1 border border-gray-400"
                disabled
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
