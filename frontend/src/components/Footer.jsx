const Footer = ({ theme }) => {
  return (
    <footer
      className={`bg-${
        theme === 'dark' ? 'backgroundDark' : 'backgroundLight'
      } absolute bottom-0 w-full h-16 flex flex-wrap justify-center items-center px-10`}
    >
      <p>Footer</p>
    </footer>
  );
};

export default Footer;
