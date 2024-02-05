import PersonalForm from '../components/forms/PersonalForm';
import EducationForm from '../components/forms/EducationForm';
import SocialLinksForm from '../components/forms/SocialLinksForm';
import SummaryForm from '../components/forms/SummaryForm';
import SkillsForm from '../components/forms/SkillsForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import ProjectsForm from '../components/forms/ProjectsForm';

const ResumeEdit = () => {
  return (
    <div className="flex flex-col w-full sm:w-[90%] justify-center my-3">
      <h1 className="text-xl text-center my-2 font-semibold uppercase">
        Edit your Resume
      </h1>

      <div className="flex flex-col w-full justify-center gap-3">
        {/* Personal Information */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border-2 border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Personal Information
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <PersonalForm />
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Social Links
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <SocialLinksForm />
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Summary
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <SummaryForm />
          </div>
        </div>

        {/* Education */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Education
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <EducationForm />
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Skills
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <SkillsForm />
          </div>
        </div>

        {/* Experience */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Experience
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <ExperienceForm />
          </div>
        </div>

        {/* Projects */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-lg text-center sm:text-left w-full sm:w-1/4 uppercase min-w-40 p-3">
            Projects
          </h2>

          <div className="personal flex flex-col p-2 flex-1">
            <ProjectsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEdit;
