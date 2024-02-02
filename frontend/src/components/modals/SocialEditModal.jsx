import { useState } from 'react';
import { addSocialLinks } from '../../utils/apis';
import { toast } from 'react-toastify';

const SocialEditModal = ({ setSocialEdit, social }) => {
  const [socialData, setSocialData] = useState({
    socialName: social?.socialName || '',
    link: social?.link || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSocialNameChange = (e) => {
    setSocialData({
      ...socialData,
      socialName: social?.socialName || e.target.value,
      link: social?.link || e.target.value,
    });
  };

  const handleEditSocialLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      socialName: socialData?.socialName?.split('//')[1]?.split('.')[0],
      link: socialData?.link,
    };
    try {
      setError('');
      const res = await addSocialLinks(data);
      if (res.status) {
        toast.success('Social link edited successfully');
        setSocialEdit(false);
        setLoading(false);
      } else {
        setError(res.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/80 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleEditSocialLink}
          className="bg-backgroundLight rounded p-5 w-[300px] text-textPrimaryLight"
        >
          <div className="flex flex-col justify-between gap-2 w-full">
            <div className="flex gap-1 flex-col items-center my-1">
              <label
                htmlFor="summary"
                className="font-semibold whitespace-nowrap text-xl "
              >
                Edit Social links
              </label>
              <select
                className="flex px-2 py-1 rounded border border-gray-500 w-full"
                name="name"
                id="name"
                value={socialData?.socialName || ''}
                onChange={handleSocialNameChange}
              >
                <option value="" disabled>
                  Select Social Media
                </option>
                {social[0]?.socialLink?.map((s) => (
                  <option key={s?._id} value={s?.link}>
                    {s?.socialName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="link"
                name="link"
                className={`${
                  !socialData?.socialName && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500 w-full`}
                placeholder="Link"
                value={socialData?.link || ''}
                onChange={(e) =>
                  setSocialData({
                    ...socialData,
                    link: e.target.value,
                  })
                }
                disabled={!socialData?.socialName}
              />
            </div>
            <div className="flex justify-end items-center gap-3">
              <button
                disabled={loading}
                type="submit"
                className="bg-secondaryColorDark text-white rounded p-1 px-3 font-semibold"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setSocialEdit(false)}
                disabled={loading}
                type="button"
                className="bg-red-700 text-white rounded p-1 px-3 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SocialEditModal;
