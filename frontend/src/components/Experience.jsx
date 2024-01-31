const Experience = ({ experience, theme }) => {
  return (
    <div className="my-2">
      <h2 className="flex flex-row justify-center items-center text-2xl font-bold max-w-[80%] mx-auto">
        Experience:
      </h2>
      <ul className="flex flex-row justify-center items-center space-x-4 my-1">
        {experience?.map((exp) => (
          <li key={exp.id}>
            <div className="flex flex-col justify-center items-center space-y-2">
              <h3 className="text-xl font-bold">{exp?.companyName}</h3>
              <p className="text-lg">{exp?.position}</p>
              <p className="text-lg">
                {exp?.startDate} - {exp?.endDate}
              </p>
              <p className="text-lg">
                {exp?.city}, {exp?.state}
              </p>
              {exp?.description && (
                <p className="text-lg">{exp?.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
