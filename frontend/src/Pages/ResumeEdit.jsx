import PersonalForm from '../components/forms/PersonalForm';
import EducationForm from '../components/forms/EducationForm';
import SocialLinksForm from '../components/forms/SocialLinksForm';
import SummaryForm from '../components/forms/SummaryForm';

const ResumeEdit = () => {
  return (
    <div className="flex flex-col w-[85%] mx-auto justify-center">
      <h1 className="text-xl text-center my-2">Edit your Resume</h1>

      <div className="flex flex-col w-full mx-auto justify-center gap-2">
        {/* Personal Information */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-xl text-center w-full sm:w-1/4">
            Personal Information
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <PersonalForm />
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-xl text-center w-full sm:w-1/4">
            Social Links
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <SocialLinksForm />
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-xl text-center w-full sm:w-1/4">Summary</h2>

          <div className="personal flex flex-col p-2 flex-1">
            <SummaryForm />
          </div>
        </div>

        {/* Education */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-xl text-center w-full sm:w-1/4">
            Education
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <EducationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEdit;
