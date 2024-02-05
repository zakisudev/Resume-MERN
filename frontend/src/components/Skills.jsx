import { IoIosWarning } from 'react-icons/io';

const Skills = ({ skills }) => {
  const frontend = [];
  const backend = [];
  const database = [];
  const devops = [];
  const other = [];

  skills?.Languages?.map((ln) => {
    if (ln.type === 'frontend') {
      return frontend.push(ln);
    } else if (ln.type === 'backend') {
      return backend.push(ln);
    } else if (ln.type === 'database') {
      return database.push(ln);
    } else if (ln.type === 'devops') {
      return devops.push(ln);
    } else {
      return other.push(ln);
    }
  });

  if (!skills && skills.length < 1) {
    return (
      <div className="flex justify-center items-center my-10 gap-10">
        <IoIosWarning className="text-4xl text-primaryColorDark" />
        <p className="text-center">{skills?.message}</p>
      </div>
    );
  }

  return (
    <div className="my-2 w-[80%] text-left">
      <h2 className="flex flex-row items-center text-2xl font-bold underline uppercase mb-2 bg-gray-300 py-2 px-1">
        Skills:
      </h2>
      {skills && frontend?.length > 0 && (
        <div className="flex flex-col justify-center p-2">
          <div className="flex gap-2 flex-col justify-between sm:flex-row my-1 mt-5 w-full">
            {skills?.Languages?.length > 0 && (
              <div className="flex flex-col gap-2 w-20">
                <h2 className="text-xl underline">Frontend</h2>
                <ul className="flex flex-col gap-2">
                  {frontend.map((ln, index) => (
                    <li
                      key={index}
                      className="text-left w-fit bg-primaryColorDark/80 rounded p-1 text-textBackgroundLight"
                    >
                      {ln.skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {backend.length > 0 && (
              <div className="flex flex-col gap-2 w-20">
                <h2 className="text-xl underline">Backend</h2>
                <ul className="flex flex-col gap-2">
                  {backend.map((ln, index) => (
                    <li
                      key={index}
                      className="text-left w-fit bg-secondaryColorLight rounded p-1 text-textBackgroundLight "
                    >
                      {ln.skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {database.length > 0 && (
              <div className="flex flex-col gap-2 w-20">
                <h2 className="text-xl underline">Database</h2>
                <ul className="flex flex-col gap-2">
                  {database.map((ln, index) => (
                    <li
                      key={index}
                      className="text-left w-fit bg-primaryColorLight rounded p-1 text-textBackgroundLight"
                    >
                      {ln.skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {devops.length > 0 && (
              <div className="flex flex-col gap-2 w-20">
                <h2 className="text-xl underline">DevOps</h2>
                <ul className="flex flex-col gap-2">
                  {devops.map((ln, index) => (
                    <li
                      key={index}
                      className="text-left w-fit bg-yellow-600 rounded p-1 text-textBackgroundLight"
                    >
                      {ln.skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {other.length > 0 && (
              <div className="flex flex-col gap-2 w-20">
                <h2 className="text-xl underline">Other</h2>
                <ul className="flex flex-col gap-2">
                  {other.map((ln, index) => (
                    <li
                      key={index}
                      className="text-left w-fit bg-secondaryColorDark rounded p-1 text-textBackgroundLight"
                    >
                      {ln.skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
