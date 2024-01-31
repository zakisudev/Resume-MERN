import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

const SocialLinks = ({ socialLinks }) => {
  return (
    <div className="my-2">
      <ul className="flex flex-row justify-center items-center space-x-4">
        {socialLinks?.map((socialLink) => (
          <li key={socialLink.id}>
            <a
              href={socialLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl"
            >
              {socialLink?.name === 'github'
                ? <FaGithub /> || 'Github'
                : socialLink?.name === 'linkedin'
                ? <FaLinkedin /> || 'LinkedIn'
                : socialLink?.name === 'twitter'
                ? <FaTwitter /> || 'Twitter'
                : socialLink?.name === 'facebook'
                ? <FaFacebook /> || 'Facebook'
                : socialLink?.name === 'instagram'
                ? <FaInstagram /> || 'Instagram'
                : ''}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
