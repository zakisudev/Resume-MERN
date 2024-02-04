const Education = ({ education }) => {
  return (
    <div className="my-2 w-full text-left">
      <h2 className="flex flex-row items-center text-2xl font-bold underline uppercase mb-2 bg-gray-300 py-2 px-1">
        Education:
      </h2>
      <ul className="flex flex-col justify-center items-center space-y-2">
        {education &&
          education?.Educations?.map((edu, index) => (
            <li
              key={edu?._id}
              className={`flex flex-col w-full ${
                index === education?.Educations?.length - 1
                  ? 'border-b-2 border-primaryColorLight pb-2'
                  : 'border-b-2 border-gray-300'
              }`}
            >
              <h3 className="text-xl font-bold italic">{edu?.schoolName}</h3>
              <p className="text-md font-semibold text-gray-500 italic">
                {edu?.degree} in {edu?.fieldOfStudy}
              </p>
              <p className="text-md">
                {edu?.startYear} - {edu?.endYear}
              </p>
              {edu?.description && (
                <p className="text-sm">{edu?.description}</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Education;
