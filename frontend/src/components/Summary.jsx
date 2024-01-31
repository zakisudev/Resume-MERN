const Summary = ({ summary }) => {
  return (
    <div className="my-2">
      <p className="flex flex-row justify-center items-center max-w-[80%] mx-auto">
        {summary?.summary}
      </p>
    </div>
  );
};

export default Summary;
