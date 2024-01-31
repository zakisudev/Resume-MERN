const Skills = ({ skills, theme }) => {
  return (
    <div className="my-2">
      <h2 className="flex flex-row justify-center items-center text-2xl font-bold max-w-[80%] mx-auto">
        Skills:
      </h2>
      <div className="flex gap-2 flex-wrap">
        {skills && skills?.type === 'frontend' && (
          <div className="flex flex-col w-20">
            <h2 className="text-lg font-semibold">Frontend</h2>
            <div className="">
              {skills
                ?.filter((skill) => skill.type === 'frontend')
                ?.map((skill) => (
                  <span>{skill}</span>
                ))}
            </div>
          </div>
        )}
        {skills && skills?.type === 'backend' && (
          <div className="flex flex-col w-20">
            <h2 className="text-lg font-semibold">Backend</h2>
            <div className="">
              {skills
                ?.filter((skill) => skill.type === 'backend')
                ?.map((skill) => (
                  <span>{skill}</span>
                ))}
            </div>
          </div>
        )}
        {skills && skills?.type === 'database' && (
          <div className="flex flex-col w-20">
            <h2 className="text-lg font-semibold">Database</h2>
            <div className="">
              {skills
                ?.filter((skill) => skill.type === 'database')
                ?.map((skill) => (
                  <span>{skill}</span>
                ))}
            </div>
          </div>
        )}
        {skills && skills?.type === 'devops' && (
          <div className="flex flex-col w-20">
            <h2 className="text-lg font-semibold">DevOps</h2>
            <div className="">
              {skills
                ?.filter((skill) => skill.type === 'devops')
                ?.map((skill) => (
                  <span>{skill}</span>
                ))}
            </div>
          </div>
        )}
        {skills && skills?.type === 'other' && (
          <div className="flex flex-col w-20">
            <h2 className="text-lg font-semibold">Other</h2>
            <div className="">
              {skills
                ?.filter((skill) => skill.type === 'other')
                ?.map((skill) => (
                  <span>{skill}</span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
