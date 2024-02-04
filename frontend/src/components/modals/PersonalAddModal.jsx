import { useState } from 'react';
import { addPersonalInfo } from '../../utils/apis';
import { toast } from 'react-toastify';

const PersonalAddModal = ({ setPersonalAddModal }) => {
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    profession: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddPersonalInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addPersonalInfo(personalData);
      if (res.status) {
        toast.success('Personal Information Added Successfully');
        setPersonalAddModal(false);
        setLoading(false);
      } else {
        setError(res.message);
        setLoading(false);
        setLoading(false);
      }
    } catch (error) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/40 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleAddPersonalInfo}
          className="bg-backgroundLight rounded p-5 min-w-[300px]"
        >
          <div className="flex flex-col gap-2 w-full p-5 justify-center">
            <h2 className="font-semibold whitespace-nowrap text-xl text-center">
              Add Personal Information
            </h2>
            <div className="flex gap-2 flex-col items-center my-1">
              <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                <div className="flex flex-col justify-between sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="firstName"
                    className="font-semibold whitespace-nowrap"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={personalData.firstName}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        firstName: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="lastName"
                    className="font-semibold whitespace-nowrap"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={personalData.lastName}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        lastName: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                <div className="flex flex-col justify-between sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="email"
                    className="font-semibold whitespace-nowrap"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={personalData.email}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        email: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="phone"
                    className="font-semibold whitespace-nowrap"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={personalData.phone}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        phone: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                <div className="flex flex-col sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="country"
                    className="font-semibold whitespace-nowrap"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={personalData.country}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        country: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="city"
                    className="font-semibold whitespace-nowrap"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={personalData.city}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        city: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                <div className="flex flex-col sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="state"
                    className="font-semibold whitespace-nowrap"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={personalData.state}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        state: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="address"
                    className="font-semibold whitespace-nowrap"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={personalData.address}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        address: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
                <div className="flex flex-col justify-between sm:flex-row gap-1 items-center">
                  <label
                    htmlFor="profession"
                    className="font-semibold whitespace-nowrap"
                  >
                    Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    value={personalData.profession}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        profession: e.target.value,
                      })
                    }
                    className="rounded p-1 px-2 w-40 border border-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-5">
              <button
                type="submit"
                className="bg-secondaryColorDark/80 rounded px-1 text-lg font-semibold text-textBackgroundDark hover:bg-secondaryColorDark transition-all duration-200 ease-in-out"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => setPersonalAddModal(false)}
                className="bg-red-500 rounded px-1 text-lg font-semibold text-textBackgroundLight hover:bg-red-700 transition-all duration-200 ease-in-out"
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

export default PersonalAddModal;
