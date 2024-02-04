import loader from '../../assets/Eclipse-1s-200px.svg';
const Loader = () => {
  return (
    <>
      <div className="flex">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-40 w-40">
          <img src={loader} alt="loader" />
        </div>
      </div>
    </>
  );
};

export default Loader;
