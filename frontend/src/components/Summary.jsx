const Summary = ({ summary }) => {
  return (
    <div className="my-2">
      <p className="flex flex-row justify-center items-center text-center text-lg w-[70%] mx-auto">
        {summary?.summary}
      </p>
    </div>
  );
};

export default Summary;
