import { IoIosWarning } from 'react-icons/io';

const Summary = ({ summary }) => {
  if (!summary && summary.length < 1) {
    return (
      <div className="flex justify-center items-center my-10 gap-10">
        <IoIosWarning className="text-4xl text-primaryColorDark" />
        <p className="text-center">{summary?.message}</p>
      </div>
    );
  }

  return (
    <div className="py-4 border-b-2 border-primaryColorLight w-[80%]">
      <p className="flex flex-row justify-center items-center text-center text-md font-semibold w-[85%] mx-auto">
        {summary?.summary}
      </p>
    </div>
  );
};

export default Summary;
