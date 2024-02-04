import { useState } from 'react';
import { addExperience } from '../../utils/apis';
import { toast } from 'react-toastify';

const ExperienceAddModal = ({ setExperienceModal }) => {
  const [experienceData, setExperienceData] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    city: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExperienceAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (experienceData?.startDate > experienceData?.endDate) {
      setError('Start date cannot be greater than end date');
      return;
    }

    try {
      const res = await addExperience(experienceData);
      if (res.status) {
        toast.success('Experience Added Successfully');
        setLoading(false);
        setExperienceModal(false);
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
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/40 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleExperienceAdd}
          className="bg-white w-full sm:w-[400px] p-7 flex flex-col gap-3 justify-center items-center mx-auto rounded text-textPrimaryLight relative"
        >
          <h1 className="text-xl font-semibold mb-3">Add new Experience</h1>
          <div className="flex flex-col w-full">
            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="companyName" className="font-semibold">
                Company name
              </label>
              <input
                type="text"
                name="companyName"
                value={experienceData?.companyName}
                minLength="6"
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    companyName: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="position" className="font-semibold">
                Position
              </label>
              <input
                type="text"
                name="position"
                minLength="6"
                value={experienceData?.position}
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    position: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex">
              <div className="flex flex-col justify-center p-2 flex-1">
                <label htmlFor="startDate" className="font-semibold">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={experienceData?.startDate || ''}
                  onChange={(e) =>
                    setExperienceData({
                      ...experienceData,
                      startDate: e.target.value,
                    })
                  }
                  className="border border-gray-500 rounded p-1"
                  required
                />
              </div>

              <div className="flex flex-col justify-center p-2 flex-1">
                <label htmlFor="endDate" className="font-semibold">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={experienceData?.endDate || ''}
                  onChange={(e) =>
                    setExperienceData({
                      ...experienceData,
                      endDate: e.target.value,
                    })
                  }
                  className="border border-gray-500 rounded p-1"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="city" className="font-semibold">
                City
              </label>
              <input
                type="text"
                name="city"
                minLength="6"
                value={experienceData?.city}
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    city: e.target.value,
                  })
                }
                className="border border-gray-500 rounded p-1"
                required
              />
            </div>

            <div className="flex flex-col justify-center p-2 flex-1">
              <label htmlFor="state" className="font-semibold">
                State
              </label>
              <input
                type="text"
                name="state"
                minLength="6"
                value={experienceData?.state}
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
                    state: e.target.value,
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
                value={experienceData?.description || ''}
                onChange={(e) =>
                  setExperienceData({
                    ...experienceData,
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
              onClick={() => setExperienceModal(false)}
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

export default ExperienceAddModal;
