const Summary = ({ summary }) => {
  return (
    <div className="py-4 border-b-2 border-primaryColorLight w-full">
      <p className="flex flex-row justify-center items-center text-center text-md font-semibold w-[85%] mx-auto">
        {summary?.summary}
      </p>
    </div>
  );
};

export default Summary;
