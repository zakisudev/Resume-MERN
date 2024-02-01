import { useEffect, useState } from 'react';
import { getEducations } from '../../utils/apis';
import EducationAddModal from '../modals/EducationAddModal';
import EducationEditModal from '../modals/EducationEditModal';

const EducationForm = () => {
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

  const handleEducationEdit = (edu) => {
    setEducationEdit(true);
    setEditingEducation(edu);
  };

  useEffect(() => {
    const fetchEducations = async () => {
      const educations = await getEducations();
      setEducations(educations);
    };
    fetchEducations();
  }, [educationModal, educationEdit]);

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

      {educations.length < 1 ? (
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
        <>
          <button
            onClick={() => setEducationModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
          {educations &&
            educations?.map((education, index) => (
              <div
                className={`flex flex-col justify-center p-2 ${
                  index !== education?.length - 2
                    ? 'border-b-2 border-primaryVariantColorLight'
                    : ''
                }`}
                key={education?._id}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col justify-center p-1 flex-1">
                    <label htmlFor="school" className="font-semibold">
                      School
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={
                        educationData?.schoolName || education?.schoolName || ''
                      }
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          school: e.target.value,
                        })
                      }
                      disabled={
                        !educationEdit || editingEducation._id !== education._id
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
                        !educationEdit || editingEducation._id !== education._id
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
                        !educationEdit || editingEducation._id !== education._id
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
                      value={educationData?.endYear || education?.endYear || ''}
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          endYear: e.target.value,
                        })
                      }
                      disabled={
                        !educationEdit || editingEducation._id !== education._id
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
                      educationData?.description || education?.description || ''
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

                <div className="flex justify-end gap-2">
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
        </>
      )}
    </>
  );
};

export default EducationForm;
