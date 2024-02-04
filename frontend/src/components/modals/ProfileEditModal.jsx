import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { updateMe } from '../../utils/apis';
import { toast } from 'react-toastify';
const ProfileEditModal = ({ profile, setProfileEditView }) => {
  const [data, setData] = useState({
    username: '',
    email: '',
    avatar: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateMe(profile._id, data);
      if (res?.status) {
        toast.success(res?.message);
        setLoading(false);
        setProfileEditView(false);
        return;
      } else {
        setError(res?.message);
        toast.error('Error while updating');
        setLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
      setError("Server error. Can't update profile");
    }
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-gray-500 absolute h-screen">
      <div className="flex justify-center items-center w-full h-screen">
        <form className="bg-white p-7 flex flex-col gap-3 justify-center items-center mx-auto rounded text-textPrimaryLight relative">
          <h1 className="text-2xl font-semibold mb-3">Edit Profile</h1>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-bold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={data?.username || profile?.username || ''}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={() => setProfileEditView(false)}
            className="absolute top-2 right-2 text-textBackgroundLight bg-secondaryColorLight rounded p-1"
          >
            <FaTimes className="text-xl hover:text-normal" />
          </button>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={data?.email || profile?.email || ''}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => setData({ ...data, avatar: e.target.files[0] })}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>

          {error?.message && (
            <div className="flex flex-col gap-1 w-full">
              <p className="text-red-500">{error?.message}</p>
            </div>
          )}

          <div className="flex flex-col gap-1 w-full">
            <button
              disabled={loading}
              onClick={handleUpdateProfile}
              className="px-3 py-1 bg-primaryColorLight rounded font-semibold text-textPrimaryDark"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
