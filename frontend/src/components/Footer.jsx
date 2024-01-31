const Footer = ({ theme }) => {
  return (
    <>
      <footer
        className={`${
          theme === 'dark'
            ? 'bg-backgroundDark text-textBackgroundLight'
            : 'bg-backgroundLight text-textBackgroundDark'
        } w-full h-16 flex flex-wrap justify-center items-center px-10 bottom-0 absolute`}
      >
        <p>Footer</p>
      </footer>
    </>
  );
};

export default Footer;
