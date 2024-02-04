import { useState } from 'react';
import { addProject } from '../../utils/apis';
import { toast } from 'react-toastify';

const ProjectAddModal = ({ setProjectModal }) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    link: '',
    technologies: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProjectAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addProject(project);
      if (res.status) {
        toast.success('Project added successfully');
        setProjectModal(false);
      } else {
        setError(res.message);
        setLoading(false);
      }
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/40 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleProjectAdd}
          className="bg-backgroundLight rounded p-5 w-full sm:w-fit text-textPrimaryLight"
        >
          <div className="flex flex-col gap-2 w-full">
            <h2 className="font-semibold whitespace-nowrap text-xl text-center mb-3">
              New Project
            </h2>
            <div className="flex flex-col justify-between sm:flex-row gap-1 items-center my-1">
              <label htmlFor="title" className="whitespace-nowrap text-xl ">
                Title
              </label>
              <input
                type="text"
                className="flex px-2 py-1 rounded border border-gray-500"
                name="title"
                id="title"
                required
                value={project?.title || ''}
                onChange={(e) =>
                  setProject({
                    ...project,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col justify-between sm:flex-row gap-1 items-center my-1">
              <label
                htmlFor="technologies"
                className="whitespace-nowrap text-xl flex flex-col"
              >
                Technologies{' '}
                <span className="text-sm -mt-1 text-gray-500">
                  (comma separated values)
                </span>
              </label>
              <input
                type="text"
                className="flex px-2 py-1 rounded border border-gray-500"
                name="technologies"
                id="technologies"
                required
                value={project?.technologies || ''}
                onChange={(e) =>
                  setProject({
                    ...project,
                    technologies: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col justify-between sm:flex-row gap-1 items-center my-1">
              <label htmlFor="link" className="whitespace-nowrap text-xl ">
                Link
              </label>
              <input
                type="link"
                className="flex px-2 py-1 rounded border border-gray-500"
                name="link"
                id="link"
                required
                value={project?.link || ''}
                onChange={(e) =>
                  setProject({
                    ...project,
                    link: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col justify-between sm:flex-row gap-1 items-center my-1">
              <label htmlFor="image" className="whitespace-nowrap text-xl ">
                Image
                <span className="text-gray-500 text-sm">(single)</span>
              </label>
              <input
                type="file"
                className="flex px-2 py-1 rounded border border-gray-500 max-w-52 text-sm"
                name="image"
                id="image"
                required
                onChange={(e) =>
                  setProject({
                    ...project,
                    image: e.target.files[0],
                  })
                }
              />
            </div>

            <div className="flex flex-col justify-between sm:flex-row gap-1 items-center my-1">
              <label
                htmlFor="description"
                className="whitespace-nowrap text-xl "
              >
                Description
              </label>
              <textarea
                type="text"
                className="flex px-2 py-1 rounded border border-gray-500 max-h-40 h-20 min-h-20"
                name="description"
                id="description"
                required
                value={project?.description || ''}
                onChange={(e) =>
                  setProject({
                    ...project,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center items-center gap-3 mt-3">
              <button
                disabled={loading}
                type="submit"
                className="bg-secondaryColorDark text-white rounded p-1 px-3 font-semibold"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
              <button
                onClick={() => setProjectModal(false)}
                disabled={loading}
                type="button"
                className="bg-red-700 text-white rounded p-1 px-3 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>

          {error && <p className="text-red-700 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProjectAddModal;
