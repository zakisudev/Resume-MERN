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
    <div className="my-4">
      <ul className="flex flex-row justify-center items-center space-x-4">
        {socialLinks[0]?.socialLink?.map((sl) => (
          <li key={sl.id}>
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
