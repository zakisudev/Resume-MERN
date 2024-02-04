import { useEffect, useState } from 'react';
import { getSkills } from '../../utils/apis';
import SkillAddModal from '../modals/SkillsAddModal';
import SkillEditModal from '../modals/SkillEditModal';
import Loader from '../common/Loader';

const SkillsForm = () => {
  const userId = localStorage.getItem('token');
  const [editingSkill, setEditingSkill] = useState([]);
  const [skillEdit, setSkillEdit] = useState(false);
  const [skillsModal, setSkillsModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  const handleSkillEdit = (skill) => {
    setEditingSkill(skill);
    setSkillEdit(true);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await getSkills(userId);
        setSkills(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [skillsModal, skillEdit, userId]);

  return (
    <>
      {skillsModal && <SkillAddModal setSkillsModal={setSkillsModal} />}

      {skillEdit && (
        <SkillEditModal
          setSkillEdit={setSkillEdit}
          skill={editingSkill}
          skillsId={skills._id}
        />
      )}

      {error && <p className="text-center text-red-700">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center w-full mx-auto">
          <Loader />
        </div>
      ) : !skills ? (
        <div className="flex justify-between gap-2 px-2">
          <p className="flex p-2 items-center">No Skills Found</p>
          <button
            onClick={() => setSkillsModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        skills && (
          <div className="flex flex-col justify-center px-2">
            <button
              onClick={() => setSkillsModal(true)}
              className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight hover:bg-blue-700 transition-all duration-200 ease-in-out hover:text-textBackgroundLight"
            >
              Add
            </button>

            <div className="flex gap-2 flex-col justify-between sm:flex-row my-1 mt-5 w-full">
              {frontend.length > 0 && (
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
                    <button
                      onClick={() => handleSkillEdit(frontend)}
                      className="bg-gray-500 rounded px-1 text-lg font-semibold w-fit text-textBackgroundLight hover:bg-primaryVariantColorLight transition-all duration-200 ease-in-out mt-2"
                    >
                      Edit
                    </button>
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
                    <button
                      onClick={() => handleSkillEdit(backend)}
                      className="bg-gray-500 rounded px-1 text-lg font-semibold text-textBackgroundLight w-fit hover:bg-primaryVariantColorLight transition-all duration-200 ease-in-out mt-2"
                    >
                      Edit
                    </button>
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
                    <button
                      onClick={() => handleSkillEdit(database)}
                      className="bg-gray-500 rounded px-1 text-lg font-semibold text-textBackgroundLight w-fit hover:bg-primaryVariantColorLight transition-all duration-200 ease-in-out mt-2"
                    >
                      Edit
                    </button>
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
                    <button
                      onClick={() => handleSkillEdit(devops)}
                      className="bg-gray-500 rounded px-1 text-lg font-semibold text-textBackgroundLight w-fit hover:bg-primaryVariantColorLight transition-all duration-200 ease-in-out mt-2"
                    >
                      Edit
                    </button>
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
                    <button
                      onClick={() => handleSkillEdit(other)}
                      className="bg-gray-500 rounded px-1 text-lg font-semibold text-textBackgroundLight w-fit hover:bg-primaryVariantColorLight transition-all duration-200 ease-in-out mt-2"
                    >
                      Edit
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SkillsForm;
