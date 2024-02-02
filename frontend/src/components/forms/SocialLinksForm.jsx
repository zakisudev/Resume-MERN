import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSocialLinks } from '../../utils/apis';
import SocialAddModal from '../modals/SocialAddModal';
import SocialEditModal from '../modals/SocialEditModal';
import { FaLinkedin } from 'react-icons/fa6';
import { FaGithub, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

const SocialLinksForm = () => {
  const [editingSocial, setEditingSocial] = useState([]);
  const [socialEdit, setSocialEdit] = useState(false);
  const [socialModal, setSocialModal] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  const handleSocialEdit = (social) => {
    setEditingSocial(social);
    setSocialEdit(true);
  };
  useEffect(() => {
    const fetchSummary = async () => {
      const res = await getSocialLinks();
      setSocialLinks(res);
    };
    fetchSummary();
  }, [socialModal, socialEdit]);

  return (
    <>
      {socialModal && <SocialAddModal setSocialModal={setSocialModal} />}

      {socialEdit && (
        <SocialEditModal setSocialEdit={setSocialEdit} social={editingSocial} />
      )}

      {!socialLinks || socialLinks.length < 1 ? (
        <div className="flex justify-between gap-2">
          <p className="flex p-2 items-center">No Summary Found</p>
          <button
            onClick={() => setSocialModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        socialLinks && (
          <div className="flex flex-col justify-center p-2">
            <button
              onClick={() => setSocialModal(true)}
              className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
            >
              Add
            </button>
            <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 mt-5 w-full">
              {socialLinks[0]?.socialLink &&
                socialLinks[0]?.socialLink?.map((sl) =>
                  sl?.socialName?.includes('linkedin') ? (
                    <Link
                      to={`${sl?.link}`}
                      key={sl?._id}
                      className="font-semibold text-4xl text-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      <FaLinkedin />
                    </Link>
                  ) : sl?.socialName.includes('github') ? (
                    <Link
                      to={`${sl?.link}`}
                      key={sl?._id}
                      className="font-semibold text-4xl hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      <FaGithub />
                    </Link>
                  ) : sl?.socialName?.includes('twitter') ? (
                    <Link
                      to={`${sl?.link}`}
                      key={sl?._id}
                      className="font-semibold text-4xl text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      <FaTwitter />
                    </Link>
                  ) : sl?.socialName?.includes('facebook') ? (
                    <Link
                      to={`${sl?.link}`}
                      key={sl?._id}
                      className="font-semibold text-4xl text-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      <FaFacebookF />
                    </Link>
                  ) : (
                    <Link
                      to={`${sl?.link}`}
                      key={sl?._id}
                      className="font-semibold text-4xl bg-gradient-to-r from-pink-500 to-yellow-500 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg"
                    >
                      <FaInstagram />
                    </Link>
                  )
                )}

              {!socialEdit && socialLinks.length !== 0 && (
                <button
                  type="button"
                  onClick={() => handleSocialEdit(socialLinks)}
                  className="bg-primaryColorLight rounded px-1 text-lg mt-2 font-semibold text-textBackgroundLight self-end"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SocialLinksForm;
