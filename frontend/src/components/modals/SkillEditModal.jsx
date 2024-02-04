import { useState } from 'react';
import { updateSkill } from '../../utils/apis';
import { toast } from 'react-toastify';

const SkillEditModal = ({ setSkillEdit, skill, skillsId }) => {
  const [skillData, setSkillData] = useState({
    skill: skill?.skill || '',
    type: skill?.type || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEditSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const res = await updateSkill(skillsId, skillData);
      if (res.status) {
        toast.success('Social link edited successfully');
        setSkillEdit(false);
        setLoading(false);
      } else {
        setError(res.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  const handleSkillChange = (e, index) => {
    const newSkill = [...skill];
    newSkill[index].skill = e.target.value;
    setSkillData(newSkill);
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/40 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleEditSkill}
          className="bg-backgroundLight rounded p-5 min-w-[300px] text-textPrimaryLight"
        >
          <div className="flex flex-col justify-between gap-2 w-full">
            <div className="flex gap-1 flex-col items-center my-1">
              <h2 className="font-semibold whitespace-nowrap text-xl">
                Edit{' '}
                {skill[0]?.type?.charAt(0).toUpperCase() +
                  skill[0]?.type?.slice(1)}{' '}
                Skills
              </h2>

              <ul className="flex flex-col gap-2 w-1/2 my-3">
                {skill?.map((sk, index) => (
                  <li
                    key={index}
                    className="flex gap-2 items-center justify-between"
                  >
                    <label
                      htmlFor={`skill${index}`}
                      className="whitespace-nowrap"
                    >
                      Skill {index + 1}
                    </label>
                    <input
                      required
                      type="text"
                      value={sk.skill || ''}
                      onChange={(e) => handleSkillChange(e, index)}
                      name={`skill${index}`}
                      id={`skill${index}`}
                      className="w-full p-1 border border-gray-500 rounded"
                    />
                  </li>
                ))}
              </ul>

              <div className="flex justify-end items-center gap-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-secondaryColorDark text-white rounded p-1 px-3 font-semibold"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setSkillEdit(false)}
                  disabled={loading}
                  type="button"
                  className="bg-red-700 text-white rounded p-1 px-3 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SkillEditModal;
