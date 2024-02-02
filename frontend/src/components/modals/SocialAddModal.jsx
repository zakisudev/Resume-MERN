import { useState } from 'react';
import { addSocialLinks } from '../../utils/apis';
import { toast } from 'react-toastify';

const SocialAddModal = ({ setSocialModal }) => {
  const [socialData, setSocialData] = useState({
    socialName: '',
    link: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSocialNameChange = (e) => {
    setSocialData({
      ...socialData,
      socialName: e.target.value,
      link: e.target.value,
    });
  };

  const handleAddSocialLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const res = await addSocialLinks({
        socialName: socialData?.socialName?.split('//')[1]?.split('.')[0],
        link: socialData?.link,
      });
      if (res.status) {
        toast.success('Social link added successfully');
        setLoading(false);
        setSocialModal(false);
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
          onSubmit={handleAddSocialLink}
          className="bg-backgroundLight rounded p-5 w-[300px]"
        >
          <div className="flex flex-col gap-2 w-full">
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
                <option value="https://github.com/">Github</option>
                <option value="https://linkedin.com/in/">Linkedin</option>
                <option value="https://twitter.com/">Twitter</option>
                <option value="https://instagram.com/">Instagram</option>
                <option value="https://facebook.com/">Facebook</option>
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
            <div className="flex justify-center items-center gap-3">
              <button
                disabled={loading}
                type="submit"
                className="bg-secondaryColorDark text-white rounded p-1 px-3 font-semibold"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
              <button
                onClick={() => setSocialModal(false)}
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

export default SocialAddModal;
