import { useState } from 'react';
import { addSummary } from '../../utils/apis';
import { toast } from 'react-toastify';

const SummaryAddModal = ({ setSummaryModal }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummaryAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addSummary({ summary });
      if (res.status) {
        toast.success('Summary added successfully');
        setSummaryModal(false);
      }
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex top-0 bottom-0 right-0 left-0 inset-0 bg-black/40 fixed h-screen w-full">
      <div className="flex justify-center items-center w-full h-screen">
        <form
          onSubmit={handleSummaryAdd}
          className="bg-backgroundLight rounded p-5 w-[300px] text-textPrimaryLight"
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-1 flex-col items-center my-1">
              <label
                htmlFor="summary"
                className="font-semibold whitespace-nowrap text-xl "
              >
                Resume summary
              </label>
              <textarea
                type="text"
                className="flex px-2 py-1 rounded border border-gray-500 max-h-40 h-20 w-full"
                name="summary"
                placeholder="Describe what you bring here..."
                id="summary"
                value={summary || ''}
                onChange={(e) => setSummary(e.target.value)}
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
                onClick={() => setSummaryModal(false)}
                disabled={loading}
                type="button"
                className="bg-red-700 text-white rounded p-1 px-3 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>

          {error && <p className="text-red-700 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SummaryAddModal;
