import { useEffect, useState } from 'react';
import { getPersonalInfo, updatePersonalInfo } from '../../utils/apis';
import { toast } from 'react-toastify';

const PersonalForm = () => {
  const [perEdit, setPerEdit] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePersonalUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await updatePersonalInfo(personalInfo?._id, personalData);
      if (res.status) {
        setPersonalInfo(res?.updatedInformation);
        toast.success('Personal Information Updated Successfully');
        setPerEdit(false);
        setLoading(false);
        return;
      } else {
        setErrorMsg(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    const fetchResume = async () => {
      const personals = await getPersonalInfo();
      setPersonalInfo(personals[0]);
    };
    fetchResume();
  }, []);

  return (
    <>
      {!personalInfo ? (
        <div className="personal flex flex-col justify-center p-2">
          "Loading..."
        </div>
      ) : (
        <form
          onSubmit={handlePersonalUpdate}
          className="personal flex flex-col justify-center p-2"
        >
          <div className="flex flex-col gap-2 w-full justify-between sm:flex-row">
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="firstName" className="whitespace-nowrap">
                First Name
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="firstName"
                id="firstName"
                value={personalData?.firstName || personalInfo?.firstName || ''}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    firstName: e.target.value,
                  })
                }
                disabled={!perEdit}
              />
            </div>
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="lastName" className="whitespace-nowrap">
                Last Name
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="lastName"
                id="lastName"
                value={personalData?.lastName || personalInfo?.lastName || ''}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    lastName: e.target.value,
                  })
                }
                disabled={!perEdit}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full justify-between sm:flex-row">
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="email" className="whitespace-nowrap">
                Email
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="email"
                id="email"
                value={personalData?.email || personalInfo?.email || ''}
                onChange={(e) =>
                  setPersonalData({ ...personalData, email: e.target.value })
                }
                disabled={!perEdit}
              />
            </div>
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="phone" className="whitespace-nowrap">
                Phone
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="phone"
                id="phone"
                value={personalData?.phone || personalInfo?.phone || ''}
                onChange={(e) =>
                  setPersonalData({ ...personalData, phone: e.target.value })
                }
                disabled={!perEdit}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full justify-between sm:flex-row">
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="address" className="whitespace-nowrap">
                Address
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="address"
                id="address"
                value={personalData?.address || personalInfo?.address || ''}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    address: e.target.value,
                  })
                }
                disabled={!perEdit}
              />
            </div>
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="city" className="whitespace-nowrap">
                City
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="city"
                id="city"
                value={personalData?.city || personalInfo?.city || ''}
                onChange={(e) =>
                  setPersonalData({ ...personalData, city: e.target.value })
                }
                disabled={!perEdit}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full justify-between sm:flex-row">
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="state" className="whitespace-nowrap">
                State
              </label>

              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="state"
                id="state"
                value={personalData?.state || personalInfo?.state || ''}
                onChange={(e) =>
                  setPersonalData({ ...personalData, state: e.target.value })
                }
                disabled={!perEdit}
              />
            </div>
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <label htmlFor="profession" className="whitespace-nowrap">
                Profession
              </label>
              <input
                type="text"
                className={`${
                  !perEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500`}
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
                disabled={!perEdit}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full justify-between sm:flex-row items-center">
            <div className="flex gap-1 flex-col items-center sm:flex-row w-full my-1">
              <label htmlFor="avatar" className="whitespace-nowrap">
                Avatar
              </label>
              <input
                type="file"
                className={`${
                  !perEdit && 'cursor-not-allowed bg-gray-200'
                } flex px-2 py-1 rounded border border-gray-500`}
                name="avatar"
                id="avatar"
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    avatar: e.target.files[0],
                  })
                }
                disabled={!perEdit}
              />
            </div>
            {!perEdit && (
              <button
                onClick={() => setPerEdit(true)}
                className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight"
              >
                Edit
              </button>
            )}
            {perEdit && (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-secondaryColorDark rounded px-1 text-lg font-semibold text-textBackgroundLight"
                >
                  {loading ? 'Loading...' : 'Save'}
                </button>
                <button
                  onClick={() => setPerEdit(false)}
                  className="bg-red-700 rounded px-1 text-lg font-semibold text-textBackgroundLight"
                >
                  Cancel
                </button>
              </>
            )}

            {errorMsg && <p className="text-red-700 text-center">{errorMsg}</p>}
          </div>
        </form>
      )}
    </>
  );
};

export default PersonalForm;
