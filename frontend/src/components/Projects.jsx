import { Link } from 'react-router-dom';

const Projects = ({ projects, theme }) => {
  return (
    <div className="my-2">
      <h2 className="flex flex-row justify-center items-center text-2xl font-bold max-w-[80%] mx-auto">
        Project:
      </h2>
      <ul className="flex flex-row justify-center items-center space-x-4 my-1">
        {projects?.map((prj) => (
          <li key={prj.id} className="flex flex-wrap gap-2">
            <div className="flex">
              <img
                src={prj?.image}
                alt={prj.title}
                className="w-24 h-24 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <h3 className="text-xl font-bold">{prj?.title}</h3>
              <p className="text-lg">{prj?.description}</p>
              <p className="text-lg flex gap-1 justify-center items-center">
                {prj?.technologies?.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </p>
              <p className="text-lg">
                {prj?.city}, {prj?.state}
              </p>
              {prj?.description && (
                <p className="text-lg">{prj?.description}</p>
              )}
              <Link to={prj?.link}>Visit site</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Projects;
