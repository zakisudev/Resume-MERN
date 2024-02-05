import { useEffect, useState } from 'react';
import { getPersonalInfo, updatePersonalInfo } from '../../utils/apis';
import { toast } from 'react-toastify';
import PersonalAddModal from '../modals/PersonalAddModal';
import Loader from './../common/Loader';

const PersonalForm = () => {
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : localStorage.getItem('userInfo');
  const [personalAddModal, setPersonalAddModal] = useState(false);
  const [personalEdit, setPersonalEdit] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  const [personalData, setPersonalData] = useState({
    firstName: personalInfo?.firstName || '',
    lastName: personalInfo?.lastName || '',
    email: personalInfo?.email || '',
    phone: personalInfo?.phone || '',
    address: personalInfo?.address || '',
    city: personalInfo?.city || '',
    state: personalInfo?.state || '',
    profession: personalInfo?.profession || '',
    avatar: '',
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePersonalUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setErrorMsg('');
    try {
      const res = await updatePersonalInfo(userId, personalData);
      if (res.status) {
        setPersonalInfo(res?.personalInformation);
        toast.success('Personal Information Updated Successfully');
        setPersonalEdit(false);
        setUpdateLoading(false);
        return;
      } else {
        setErrorMsg(res?.message || 'Error updating personal data');
        setUpdateLoading(false);
      }
    } catch (error) {
      setUpdateLoading(false);
      setErrorMsg('Error fetching personal data');
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setFetchLoading(true);
        const personals = await getPersonalInfo(userId);
        setPersonalInfo(personals?.PersonalInfo[0]);
      } catch (error) {
        setPersonalInfo(null);
        setErrorMsg('Error in getting personal information');
        setFetchLoading(false);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchResume();
  }, [personalAddModal, personalEdit, userId]);

  return (
    <>
      {personalAddModal && (
        <PersonalAddModal setPersonalAddModal={setPersonalAddModal} />
      )}

      {errorMsg && <p className="text-center text-red-700">{errorMsg}</p>}

      {fetchLoading ? (
        <div className="flex justify-center items-center w-full mx-auto">
          <Loader />
        </div>
      ) : !personalInfo ? (
        <div className="flex justify-between gap-2">
          <p className="flex p-2 items-center">No Personal Information Found</p>
          <button
            onClick={() => setPersonalAddModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        personalInfo && (
          <form
            onSubmit={handlePersonalUpdate}
            className="flex flex-col justify-center px-2"
          >
            <div className="flex flex-col gap-2 w-full justify-between md:flex-row">
              <div className="flex gap-2 justify-between items-center my-1 w-64">
                <label
                  htmlFor="firstName"
                  className="font-semibold whitespace-nowrap"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="firstName"
                  id="firstName"
                  value={
                    personalData?.firstName || personalInfo?.firstName || ''
                  }
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      firstName: e.target.value,
                    })
                  }
                  disabled={!personalEdit}
                />
              </div>
              <div className="flex gap-2 justify-between items-center my-1 w-64">
                <label
                  htmlFor="lastName"
                  className="font-semibold whitespace-nowrap"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="lastName"
                  id="lastName"
                  value={personalData?.lastName || personalInfo?.lastName || ''}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      lastName: e.target.value,
                    })
                  }
                  disabled={!personalEdit}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full justify-between md:flex-row">
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="email"
                  className="font-semibold whitespace-nowrap"
                >
                  Email
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="email"
                  id="email"
                  value={personalData?.email || personalInfo?.email || ''}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, email: e.target.value })
                  }
                  disabled={!personalEdit}
                />
              </div>
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="phone"
                  className="font-semibold whitespace-nowrap"
                >
                  Phone
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="phone"
                  id="phone"
                  value={personalData?.phone || personalInfo?.phone || ''}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, phone: e.target.value })
                  }
                  disabled={!personalEdit}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full justify-between md:flex-row">
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="address"
                  className="font-semibold whitespace-nowrap"
                >
                  Address
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="address"
                  id="address"
                  value={personalData?.address || personalInfo?.address || ''}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      address: e.target.value,
                    })
                  }
                  disabled={!personalEdit}
                />
              </div>
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="city"
                  className="font-semibold whitespace-nowrap"
                >
                  City
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="city"
                  id="city"
                  value={personalData?.city || personalInfo?.city || ''}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, city: e.target.value })
                  }
                  disabled={!personalEdit}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full justify-between md:flex-row">
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="state"
                  className="font-semibold whitespace-nowrap"
                >
                  State
                </label>

                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="state"
                  id="state"
                  value={personalData?.state || personalInfo?.state || ''}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, state: e.target.value })
                  }
                  disabled={!personalEdit}
                />
              </div>
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="profession"
                  className="font-semibold whitespace-nowrap"
                >
                  Profession
                </label>
                <input
                  type="text"
                  className={`${
                    !personalEdit && 'cursor-not-allowed'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="profession"
                  id="profession"
                  value={
                    personalData?.profession || personalInfo?.profession || ''
                  }
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      profession: e.target.value,
                    })
                  }
                  disabled={!personalEdit}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full justify-between sm:flex-row items-center">
              <div className="flex gap-2 flex-col justify-between items-center sm:flex-row my-1 w-64">
                <label
                  htmlFor="avatar"
                  className="font-semibold whitespace-nowrap"
                >
                  Avatar
                </label>
                <input
                  type="file"
                  className={`${
                    !personalEdit && 'cursor-not-allowed bg-gray-200'
                  } flex px-2 py-1 rounded border border-gray-500 w-40`}
                  name="avatar"
                  id="avatar"
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      avatar: e.target.files[0],
                    })
                  }
                  disabled={!personalEdit}
                />
              </div>

              {!personalEdit && (
                <button
                  type="button"
                  onClick={() => setPersonalEdit(true)}
                  className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
                >
                  Edit
                </button>
              )}

              {personalEdit && (
                <div className="flex justify-center gap-2">
                  <button
                    type="submit"
                    disabled={updateLoading || fetchLoading}
                    className="bg-secondaryColorDark rounded px-1 text-lg font-semibold text-textBackgroundLight"
                  >
                    {updateLoading ? 'Loading...' : 'Save'}
                  </button>
                  <button
                    disabled={updateLoading || fetchLoading}
                    type="button"
                    onClick={() => {
                      setPersonalEdit(false);
                      setErrorMsg('');
                    }}
                    className="bg-red-700 rounded px-1 text-lg font-semibold text-textBackgroundLight"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        )
      )}
    </>
  );
};

export default PersonalForm;
