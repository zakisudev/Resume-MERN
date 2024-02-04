import { useEffect, useState } from 'react';
import { getSummary, updateSummary } from '../../utils/apis';
import { toast } from 'react-toastify';
import SummaryAddModal from '../modals/SummaryAddModal';
import Loader from '../common/Loader';

const SummaryForm = () => {
  const userId = localStorage.getItem('token');
  const [summaryEdit, setSummaryEdit] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [summary, setSummary] = useState({});
  const [summaryData, setSummaryData] = useState({
    summary: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSummaryUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateSummary(summary?._id, summaryData);
      if (res.status) {
        toast.success('Summary updated successfully');
        setSummaryEdit(false);
        setLoading(false);
        return;
      } else {
        setErrorMsg(res.message);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await getSummary(userId);
        setSummary(res[0]);
      } catch (error) {
        setErrorMsg('Error in getting summary');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [summaryModal, userId, summaryEdit]);

  return (
    <>
      {summaryModal && <SummaryAddModal setSummaryModal={setSummaryModal} />}

      {errorMsg && <p className="text-center text-red-700">{errorMsg}</p>}

      {loading ? (
        <div className="flex justify-center items-center w-full mx-auto">
          <Loader />
        </div>
      ) : !summary ? (
        <div className="flex justify-between gap-2">
          <p className="flex p-2 items-center">No Summary Found</p>
          <button
            onClick={() => setSummaryModal(true)}
            className="bg-primaryColorLight rounded px-1 text-lg font-semibold text-textBackgroundLight hover:bg-blue-700 transition-all duration-200 ease-in-out hover:text-textBackgroundLight"
          >
            Add
          </button>
        </div>
      ) : (
        summary && (
          <form
            onSubmit={handleSummaryUpdate}
            className="flex flex-col justify-center px-2"
          >
            <div className="flex gap-1 flex-col items-center sm:flex-row my-1">
              <textarea
                type="text"
                className={`${
                  !summaryEdit && 'cursor-not-allowed'
                } flex px-2 py-1 rounded border border-gray-500 w-full flex-1 max-h-40 h-20`}
                name="summary"
                id="summary"
                value={summaryData?.summary || summary?.summary || ''}
                onChange={(e) =>
                  setSummaryData({ ...summaryData, summary: e.target.value })
                }
                disabled={!summaryEdit}
              />
            </div>
            {!summaryEdit && (
              <button
                type="button"
                onClick={() => setSummaryEdit(true)}
                className="bg-primaryColorLight rounded px-1 text-lg mt-2 font-semibold text-textBackgroundLight self-end"
              >
                Edit
              </button>
            )}

            {summaryEdit && (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-secondaryColorDark rounded px-1 text-lg font-semibold text-textBackgroundLight"
                >
                  {loading ? 'Loading...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryEdit(false)}
                  className="bg-red-700 rounded px-1 text-lg font-semibold text-textBackgroundLight"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        )
      )}
    </>
  );
};

export default SummaryForm;
