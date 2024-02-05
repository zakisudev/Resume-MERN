import { useEffect, useState } from 'react';
import { getEducations } from '../../utils/apis';
import EducationAddModal from '../modals/EducationAddModal';
import EducationEditModal from '../modals/EducationEditModal';
import Loader from '../common/Loader';

const EducationForm = () => {
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : localStorage.getItem('userId');
  const [educations, setEducations] = useState([]);
  const [educationEdit, setEducationEdit] = useState(false);
  const [editingEducation, setEditingEducation] = useState({});
  const [educationModal, setEducationModal] = useState(false);
  const [educationData, setEducationData] = useState({
    school: '',
    degree: '',
    startYear: '',
    endYear: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEducationEdit = (edu) => {
    setEducationEdit(true);
    setEditingEducation(edu);
  };

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        setLoading(true);
        const educations = await getEducations(userId);
        setEducations(educations);
      } catch (error) {
        setErrorMsg('Error in getting educations');
      } finally {
        setLoading(false);
      }
    };
    fetchEducations();
  }, [educationModal, educationEdit, userId]);

  return (
    <>
      {educationModal && (
        <EducationAddModal setEducationModal={setEducationModal} />
      )}

      {educationEdit && (
        <EducationEditModal
          setEducationEdit={setEducationEdit}
          editingEducation={editingEducation}
        />
      )}

      {errorMsg && <p className="text-center text-red-700">{errorMsg}</p>}

      {loading ? (
        <div className="flex justify-center items-center w-full mx-auto">
          <Loader />
        </div>
      ) : !educations?.Educations || educations?.length < 1 ? (
        <div className="flex justify-between gap-2">
          <p className="flex p-2 items-center">No Education Found</p>
          <button
            onClick={() => setEducationModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        educations && (
          <div className="flex flex-col justify-center gap-2 px-2">
            <button
              onClick={() => setEducationModal(true)}
              className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight hover:bg-blue-700 transition-all duration-200 ease-in-out hover:text-textBackgroundLight"
            >
              Add
            </button>
            {educations &&
              educations?.Educations?.map((education, index) => (
                <div
                  className={`flex flex-col justify-center py-2 ${
                    index !== education?.length - 2
                      ? 'border-b-2 border-primaryVariantColorLight'
                      : ''
                  }`}
                  key={education?._id}
                >
                  <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <div className="flex flex-col justify-center p-1 flex-1">
                      <label htmlFor="school" className="font-semibold">
                        School
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={
                          educationData?.schoolName ||
                          education?.schoolName ||
                          ''
                        }
                        onChange={(e) =>
                          setEducationData({
                            ...educationData,
                            school: e.target.value,
                          })
                        }
                        disabled={
                          !educationEdit ||
                          editingEducation._id !== education._id
                        }
                        className={`${
                          !educationEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                    <div className="flex flex-col justify-center p-1 flex-1">
                      <label htmlFor="degree" className="font-semibold">
                        Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={educationData?.degree || education?.degree || ''}
                        onChange={(e) =>
                          setEducationData({
                            ...educationData,
                            degree: e.target.value,
                          })
                        }
                        disabled={
                          !educationEdit ||
                          editingEducation._id !== education._id
                        }
                        className={`${
                          !educationEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="flex flex-col justify-center p-1 flex-1">
                      <label htmlFor="startYear" className="font-semibold">
                        Start Year
                      </label>
                      <input
                        type="number"
                        name="startYear"
                        min="1900"
                        max="2099"
                        value={
                          educationData?.startYear || education?.startYear || ''
                        }
                        onChange={(e) =>
                          setEducationData({
                            ...educationData,
                            startYear: e.target.value,
                          })
                        }
                        disabled={
                          !educationEdit ||
                          editingEducation._id !== education._id
                        }
                        className={`${
                          !educationEdit && 'cursor-not-allowed'
                        } border border-gray-500 rounded p-1`}
                      />
                    </div>
                    <div className="flex flex-col justify-center p-1 flex-1">
                      <label htmlFor="endYear" className="font-semibold">
                        End Year
                      </label>
                      <input
                        type="number"
                        name="endYear"
                        min="1900"
                        max="2099"
                        value={
                          educationData?.endYear || education?.endYear || ''
                        }
                        onChange={(e) =>
                          setEducationData({
                            ...educationData,
                            endYear: e.target.value,
                          })
                        }
                        disabled={
                          !educationEdit ||
                          editingEducation._id !== education._id
                        }
                        className={`${
                          !educationEdit && 'cursor-not-allowed'
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
                        educationData?.description ||
                        education?.description ||
                        ''
                      }
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          description: e.target.value,
                        })
                      }
                      disabled={
                        !educationEdit || editingEducation._id !== education._id
                      }
                      className={`${
                        !educationEdit && 'cursor-not-allowed'
                      } border border-gray-500 rounded p-1 max-h-16`}
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => handleEducationEdit(education)}
                      className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )
      )}
    </>
  );
};

export default EducationForm;
