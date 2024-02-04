import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../utils/apis';
import { FaHome, FaPrint, FaTrash, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';
import ProfileEditModal from '../components/modals/ProfileEditModal';
import Loader from '../components/common/Loader';

const Profile = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('token');
  const [profile, setProfile] = useState({});
  const [profileEditView, setProfileEditView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError('');
        setLoading(true);
        const res = await getMe(user);
        if (!res?.status && !user) {
          return navigate('/admin/login', { replace: true });
        }
        setProfile(res?.profile);
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
        return;
      }
    };
    fetchProfile();
  }, [profileEditView, navigate, user]);

  return (
    <>
      {profileEditView && (
        <ProfileEditModal
          profile={profile}
          setProfileEditView={setProfileEditView}
        />
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-700 p-2">{error}</p>
      ) : (
        profile && (
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
                className="px-3 py-1 mx-3 transition-all duration-300 ease-in-out hover:bg-primaryColorLight/80 hover:scale-105 rounded flex items-center justify-center gap-2"
              >
                <FaHome className="text-xl" />
              </Link>

              <div className="flex gap-3">
                <Link
                  to={`/resume/${user}`}
                  className="px-3 py-1 bg-primaryColorLight rounded flex w-full sm:w-auto items-center justify-center gap-2 text-textPrimaryDark hover:bg-primaryColorLight/80 transition-all duration-300 ease-in-out"
                >
                  <FaPrint />{' '}
                  <span className="whitespace-nowrap text-md sm:text-xl">
                    Edit Resume
                  </span>
                </Link>

                <button
                  onClick={() => setProfileEditView(true)}
                  type="button"
                  className="px-3 py-1 bg-secondaryColorDark rounded flex w-full sm:w-auto items-center justify-center gap-2 text-textPrimaryDark hover:bg-secondaryColorDark/80 transition-all duration-300 ease-in-out"
                >
                  <FaUser />{' '}
                  <span className="whitespace-nowrap text-md sm:text-xl">
                    Edit Profile
                  </span>
                </button>
              </div>

              <button
                type="button"
                className="px-3 py-1 bg-red-700 rounded flex items-center justify-center w-full sm:w-auto gap-2 text-textPrimaryDark hover:bg-red-900 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <FaTrash />{' '}
                <span className="whitespace-nowrap text-sm sm:text-md">
                  Delete Account
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-[400px] mx-auto">
              <div className="flex flex-col gap-1">
                <label htmlFor="username">Username</label>
                <span className="font-semibold">{profile?.username}</span>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <span className="font-semibold">{profile?.email}</span>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="registerDate">Member since</label>
                <span className="font-semibold">
                  {profile?.createdAt
                    ? format(new Date(profile?.createdAt), 'MMMM d, yyyy')
                    : ''}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="profileActivity">Last activity</label>
                <span className="font-semibold">
                  {profile?.updatedAt
                    ? format(new Date(profile?.updatedAt), 'MMMM d, yyyy')
                    : ''}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
