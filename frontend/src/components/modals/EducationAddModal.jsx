import { useState } from 'react';
import { addEducation } from '../../utils/apis';
import { toast } from 'react-toastify';

const EducationModal = ({ setEducationModal }) => {
  const [educationData, setEducationData] = useState({
    schoolName: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEducationAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addEducation(educationData);
      if (res.status) {
        toast.success('Education Added Successfully');
        setLoading(false);
        setEducationModal(false);
        return;
      } else {
        setError(res.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/80 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleEducationAdd}
          className="bg-white w-full sm:w-[400px] p-7 flex flex-col gap-3 justify-center items-center mx-auto rounded text-textPrimaryLight relative"
        >
          <h1 className="text-xl font-semibold mb-3">Add new Education</h1>
          <div className="flex flex-col w-full">
            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="school" className="font-semibold">
                School
              </label>
              <input
                type="text"
                name="school"
                value={educationData?.schoolName}
                minLength="6"
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    schoolName: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="degree" className="font-semibold">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                minLength="6"
                value={educationData?.degree}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    degree: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="fieldOfStudy" className="font-semibold">
                Field of Study
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                minLength="6"
                value={educationData?.fieldOfStudy}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    fieldOfStudy: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="startYear" className="font-semibold">
                Start Year
              </label>
              <input
                type="number"
                name="startYear"
                min="1900"
                max="2099"
                value={educationData?.startYear || ''}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    startYear: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="endYear" className="font-semibold">
                End Year
              </label>
              <input
                type="number"
                name="endYear"
                min="1900"
                max="2099"
                value={educationData?.endYear || ''}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    endYear: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                value={educationData?.description || ''}
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe with a minimum of 10 words"
                className="border border-gray-500 rounded p-1 max-h-20 min-h-10"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-700">{error}</p>}

          <div className="flex justify-center gap-3">
            <button
              disabled={loading}
              type="submit"
              className="bg-secondaryColorDark text-white rounded p-1 px-3"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button
              disabled={loading}
              type="button"
              onClick={() => setEducationModal(false)}
              className="bg-red-700 text-white rounded p-1 px-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationModal;
