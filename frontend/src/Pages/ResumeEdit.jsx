import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getEducations,
  getExperiences,
  getPersonalInfo,
  getProjects,
  getSkills,
  getSocialLinks,
  getSummary,
} from '../utils/apis';
import PersonalForm from '../components/forms/PersonalForm';
import EducationForm from '../components/forms/EducationForm';

const ResumeEdit = () => {
  const userId = useParams();
  const [socialLinks, setSocialLinks] = useState([]);
  const [summary, setSummary] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const fetchResume = async () => {
      const personals = await getPersonalInfo();
      setPersonalInfo(personals);
      fetchSocial();
    };
    const fetchSocial = async () => {
      const socials = await getSocialLinks();
      setSocialLinks(socials);
      fetchSummary();
    };
    const fetchSummary = async () => {
      const summaries = await getSummary();
      setSummary(summaries);
      fetchEducations();
    };
    const fetchEducations = async () => {
      const educations = await getEducations();
      setEducations(educations);
      fetchExperience();
    };
    const fetchExperience = async () => {
      const experiences = await getExperiences();
      setExperiences(experiences);
      fetchProjects();
    };
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
      fetchSkills();
    };
    const fetchSkills = async () => {
      const skills = await getSkills();
      setSkills(skills);
    };
    fetchResume();
  }, []);

  return (
    <div className="flex flex-col w-[85%] mx-auto justify-center">
      <h1 className="text-xl text-center my-2">Edit your Resume</h1>

      <div className="flex flex-col w-full mx-auto justify-center gap-2">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-xl text-center w-full sm:w-1/4">
            Personal Information
          </h2>

          {personalInfo && (
            <div className="personal flex flex-col p-2 flex-1">
              <PersonalForm />
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border border-gray-500 rounded divide-x-0 sm:divide-x-2 sm:divide-slate-700 p-3 flex-1 min-w-fit">
          <h2 className="flex text-xl text-center w-full sm:w-1/4">
            Education
          </h2>

          {educations && (
            <div className="personal flex flex-col p-2 flex-1">
              <EducationForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEdit;
