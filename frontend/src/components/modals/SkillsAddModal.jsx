import { useState } from 'react';
import { addSkill } from '../../utils/apis';
import { toast } from 'react-toastify';

const SkillAddModal = ({ setSkillsModal }) => {
  const [skillData, setSkillData] = useState({
    skill: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const res = await addSkill(skillData);
      if (res.status) {
        toast.success('Skill added successfully');
        setLoading(false);
        setSkillsModal(false);
      } else {
        setError(res.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/40 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleAddSkill}
          className="bg-backgroundLight rounded p-5 w-[300px]"
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-1 flex-col items-center my-1">
              <h2 className="font-semibold whitespace-nowrap text-xl text-textPrimaryLight">
                Add Skill
              </h2>
              <label htmlFor="type">Skill type</label>
              <select
                required
                onChange={(e) =>
                  setSkillData({ ...skillData, type: e.target.value })
                }
                name="type"
                id="type"
                className="w-full p-1 border border-gray-500 rounded text-textPrimaryLight"
              >
                <option value="">Select Skill type</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="skill">Skill</label>
              <input
                required
                onChange={(e) =>
                  setSkillData({ ...skillData, skill: e.target.value })
                }
                type="text"
                name="skill"
                id="skill"
                className="w-full p-1 border border-gray-500 rounded text-textPrimaryLight"
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <button
                disabled={loading}
                type="submit"
                className="bg-secondaryColorDark text-white rounded p-1 px-3 font-semibold"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
              <button
                onClick={() => setSkillsModal(false)}
                disabled={loading}
                type="button"
                className="bg-red-700 text-white rounded p-1 px-3 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SkillAddModal;
