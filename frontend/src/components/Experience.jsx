import format from 'date-fns/format';
import { IoIosWarning } from 'react-icons/io';
const Experience = ({ experience }) => {
  if (!experience && experience.length < 1) {
    return (
      <div className="flex justify-center items-center my-10 gap-10">
        <IoIosWarning className="text-4xl text-primaryColorDark" />
        <p className="text-center">{experience?.message}</p>
      </div>
    );
  }

  return (
    <div className="my-2 w-[80%] text-left">
      <h2 className="flex flex-row items-center text-2xl font-bold underline uppercase mb-2 bg-gray-300 py-2 px-1">
        Experience:
      </h2>
      <ul className="flex flex-col justify-center items-center space-y-2">
        {experience?.work?.map((exp, index) => (
          <li
            key={exp?._id}
            className={`flex flex-col w-full ${
              index === experience?.work?.length - 1
                ? 'border-b-2 border-primaryColorLight pb-2'
                : 'border-b-2 border-gray-300'
            }`}
          >
            <h3 className="text-xl font-bold italic">{exp?.position}</h3>
            <p className="text-md font-semibold text-gray-500 italic">
              {exp?.companyName} from{' '}
              {format(new Date(exp?.startDate), 'MMMM dd, yyyy')} to{' '}
              {format(new Date(exp?.endDate), 'MMMM dd, yyyy')}
            </p>
            {exp?.description && <p className="text-sm">{exp?.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
