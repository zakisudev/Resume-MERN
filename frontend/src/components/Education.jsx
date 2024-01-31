const Education = ({ education }) => {
  return (
    <div className="my-2">
      <h2 className="flex flex-row justify-center items-center text-2xl font-bold max-w-[80%] mx-auto">
        Education:
      </h2>
      <ul className="flex flex-row justify-center items-center space-x-4">
        {education?.map((edu) => (
          <li key={edu.id}>
            <div className="flex flex-col justify-center items-center space-y-2">
              <h3 className="text-xl font-bold">{edu?.schoolName}</h3>
              <p className="text-lg">{edu?.degree}</p>
              <p className="text-lg">{edu?.fieldOfStudy}</p>
              <p className="text-lg">
                {edu?.startYear} - {edu?.endYear}
              </p>
              {edu?.description && (
                <p className="text-lg">{edu?.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
