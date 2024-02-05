import { useEffect, useState } from 'react';
import { getProjects } from '../../utils/apis';
import ProjectAddModal from '../modals/ProjectAddModal';
import { Link } from 'react-router-dom';
import ProjectEditModal from '../modals/ProjectEditModal';
import Loader from '../common/Loader';

const ProjectsForm = () => {
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : localStorage.getItem('userId');
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleClose = () => {
    setIsImageOpen(false);
  };

  const handleProjectEditModal = (proj) => {
    setProjectEdit(true);
    setEditingProject(proj);
  };

  useEffect(() => {
    try {
      setLoading(true);
      setErrorMsg('');
      const fetchProject = async () => {
        const res = await getProjects(userId);
        setProjects(res?.project);
      };
      fetchProject();
    } catch (error) {
      setErrorMsg(error?.message);
    } finally {
      setLoading(false);
    }
  }, [userId, projectModal, projectEdit]);

  return (
    <>
      {projectModal && <ProjectAddModal setProjectModal={setProjectModal} />}

      {projectEdit && (
        <ProjectEditModal
          setProjectEdit={setProjectEdit}
          project={editingProject}
        />
      )}

      {errorMsg && <p className="text-center text-red-700">{errorMsg}</p>}

      {loading ? (
        <div className="flex justify-center items-center w-full mx-auto">
          <Loader />
        </div>
      ) : !projects ? (
        <div className="flex justify-between gap-2">
          <p className="flex p-2 items-center">No Project Found</p>
          <button
            onClick={() => setProjectModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        projects && (
          <div className="flex flex-col justify-center gap-2 px-2">
            <button
              onClick={() => setProjectModal(true)}
              className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight hover:bg-blue-700 transition-all duration-200 ease-in-out hover:text-textBackgroundLight"
            >
              Add
            </button>
            <div className="flex flex-col gap-2">
              {projects?.map((project, index) => (
                <div
                  key={project?._id}
                  className={`${
                    index === projects?.length - 1
                      ? 'border-blue-700'
                      : 'border-gray-500'
                  } border-b-2 flex w-full`}
                >
                  <img
                    src={`/${project?.image}`}
                    alt={project?.title}
                    className="w-20 h-20 object-cover cursor-pointer p-2"
                    onClick={handleImageClick}
                  />
                  {isImageOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-black/40 opacity-75"></div>
                        </div>

                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                          <img
                            src={`/${project?.image}`}
                            alt={project?.title}
                            className="w-full h-full object-cover"
                          />
                          <button onClick={handleClose}>Close</button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">{project?.title}</h2>
                    <p className="text-gray-500 text-sm">
                      {project?.description}
                    </p>
                    <ul className="inline-flex gap-3">
                      <>
                        <span className="font-semibold whitespace-nowrap">
                          Technologies used:{' '}
                        </span>
                        {project?.technologies[0]
                          ?.split(',')
                          ?.map((technology, index) => {
                            if (
                              index ===
                              project?.technologies[0]?.split(',').length - 1
                            ) {
                              return <li key={index}>{technology.trim()}</li>;
                            }
                            return (
                              <li key={index} className="whitespace-nowrap">
                                {technology.trim()} /
                              </li>
                            );
                          })}
                      </>
                    </ul>
                    <Link
                      to={project?.link}
                      className="text-blue-700 hover:underline w-fit"
                      target="_blank"
                    >
                      Visit demo
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center p-2 ml-auto">
                    <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
                      <button
                        type="button"
                        onClick={() => handleProjectEditModal(project)}
                        className="bg-primaryColorLight rounded px-1 text-lg mt-2 font-semibold text-textBackgroundLight self-end"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProjectsForm;
