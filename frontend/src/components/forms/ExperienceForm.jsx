import { useEffect, useState } from 'react';
import { getExperiences } from '../../utils/apis';
import ExperienceEditModal from '../modals/ExperienceEditModal';
import ExperienceAddModal from '../modals/ExperienceAddModal';
import Loader from '../common/Loader';

const ExperienceForm = () => {
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : localStorage.getItem('userId');
  const [experiences, setExperiences] = useState([]);
  const [experienceEdit, setExperienceEdit] = useState(false);
  const [editingExperience, setEditingExperience] = useState({});
  const [experienceModal, setExperienceModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [experienceData, setExperienceData] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    city: '',
    state: '',
  });

  const handleExperienceEdit = (edu) => {
    setExperienceEdit(true);
    setEditingExperience(edu);
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError('');
        const exp = await getExperiences(userId);
        setExperiences(exp?.work);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, [experienceModal, experienceEdit, userId]);

  return (
    <>
      {experienceModal && (
        <ExperienceAddModal setExperienceModal={setExperienceModal} />
      )}

      {experienceEdit && (
        <ExperienceEditModal
          setExperienceEdit={setExperienceEdit}
          editingExperience={editingExperience}
        />
      )}

      {error && <p className="text-center text-red-700">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center w-full mx-auto">
          <Loader />
        </div>
      ) : !experiences || experiences?.length < 1 ? (
        <div className="flex justify-between gap-2">
          <p className="flex p-2 items-center">No Experience Found</p>
          <button
            onClick={() => setExperienceModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        experiences && (
          <div className="flex flex-col justify-center gap-2 px-2">
            <button
              onClick={() => setExperienceModal(true)}
              className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight hover:bg-blue-700 transition-all duration-200 ease-in-out hover:text-textBackgroundLight"
            >
              Add
            </button>
            {experiences &&
              experiences?.map((exp, index) => (
                <form
                  className={`flex flex-col gap-2 justify-center py-2 ${
                    index !== exp?.length - 2
                      ? 'border-b-2 border-primaryVariantColorLight'
                      : ''
                  }`}
                  key={exp?._id}
                >
                  <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                    <div className="flex justify-between gap-1 items-center p-1 w-64">
                      <label
                        htmlFor="companyName"
                        className="font-semibold whitespace-nowrap"
                      >
                        Company name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={
                          experienceData?.companyName || exp?.companyName || ''
                        }
                        onChange={(e) =>
                          setExperienceData({
                            ...experienceData,
                            companyName: e.target.value,
                          })
                        }
                        disabled={
                          !experienceEdit || editingExperience._id !== exp._id
                        }
                        className={`${
                          !experienceEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1 w-full`}
                      />
                    </div>

                    <div className="flex justify-between gap-1 items-center p-1 w-64">
                      <label htmlFor="position" className="font-semibold">
                        Position
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={experienceData?.position || exp?.position || ''}
                        onChange={(e) =>
                          setExperienceData({
                            ...experienceData,
                            position: e.target.value,
                          })
                        }
                        disabled={
                          !experienceEdit || editingExperience._id !== exp._id
                        }
                        className={`${
                          !experienceEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1 w-full`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between sm:flex-row gap-2">
                    <div className="flex justify-between gap-1 items-center p-1 w-64">
                      <label htmlFor="startDate" className="font-semibold">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={exp?.startDate?.split('T')[0] || ''}
                        onChange={(e) =>
                          setExperienceData({
                            ...experienceData,
                            startDate: e.target.value,
                          })
                        }
                        disabled={
                          !experienceEdit || editingExperience._id !== exp._id
                        }
                        className={`${
                          !experienceEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                    <div className="flex justify-between gap-1 items-center p-1 w-64">
                      <label htmlFor="endDate" className="font-semibold">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={exp?.endDate?.split('T')[0] || ''}
                        onChange={(e) =>
                          setExperienceData({
                            ...experienceData,
                            endDate: e.target.value,
                          })
                        }
                        disabled={
                          !experienceEdit || editingExperience._id !== exp._id
                        }
                        className={`${
                          !experienceEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                    <div className="flex justify-between gap-1 items-center p-1 w-64">
                      <label htmlFor="state" className="font-semibold">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={experienceData?.state || exp?.state || ''}
                        onChange={(e) =>
                          setExperienceData({
                            ...experienceData,
                            state: e.target.value,
                          })
                        }
                        disabled={
                          !experienceEdit || editingExperience._id !== exp._id
                        }
                        className={`${
                          !experienceEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                    <div className="flex justify-between gap-1 items-center p-1 w-64">
                      <label htmlFor="city" className="font-semibold">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={experienceData?.city || exp?.city || ''}
                        onChange={(e) =>
                          setExperienceData({
                            ...experienceData,
                            city: e.target.value,
                          })
                        }
                        disabled={
                          !experienceEdit || editingExperience._id !== exp._id
                        }
                        className={`${
                          !experienceEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-1">
                    <label htmlFor="description" className="font-semibold">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={
                        experienceData?.description || exp?.description || ''
                      }
                      onChange={(e) =>
                        setExperienceData({
                          ...experienceData,
                          description: e.target.value,
                        })
                      }
                      disabled={
                        !experienceEdit || editingExperience._id !== exp._id
                      }
                      className={`${
                        !experienceEdit && 'cursor-not-allowed'
                      } border border-gray-500 rounded p-1 h-20`}
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => handleExperienceEdit(exp)}
                      className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              ))}
          </div>
        )
      )}
    </>
  );
};

export default ExperienceForm;
