const Footer = ({ theme }) => {
  return (
    <footer
      className={`bg-${
        theme === 'dark' ? 'backgroundDark' : 'backgroundLight'
      } sticky w-full h-16 flex flex-wrap justify-center items-center px-10 bg-gray-500 text-backgroundLight`}
    >
      <p>Footer</p>
    </footer>
  );
};

export default Footer;
