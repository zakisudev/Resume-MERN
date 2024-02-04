import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialLinks = ({ socialLinks }) => {
  return (
    <div className="w-full">
      <ul className="flex flex-row justify-center items-center space-x-4">
        {socialLinks &&
          socialLinks?.SocialLink?.map((sl) => (
            <li
              key={sl?._id}
              className=" hover:scale-110 transition-all duration-200"
            >
              <Link
                to={sl?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                {sl?.socialName === 'github'
                  ? <FaGithub /> || 'Github'
                  : sl?.socialName === 'linkedin'
                  ? <FaLinkedin /> || 'LinkedIn'
                  : sl?.socialName === 'twitter'
                  ? <FaTwitter /> || 'Twitter'
                  : sl?.socialName === 'facebook'
                  ? <FaFacebook /> || 'Facebook'
                  : sl?.socialName === 'instagram'
                  ? <FaInstagram /> || 'Instagram'
                  : ''}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
