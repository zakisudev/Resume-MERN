import { useEffect, useState } from 'react';
import PersonalInformation from '../components/PersonalInformation';
import SocialLinks from '../components/SocialLinks';
import Summary from '../components/Summary';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import {
  getEducations,
  getExperiences,
  getPersonalInfo,
  getProjects,
  getSkills,
  getSocialLinks,
  getSummary,
} from '../utils/apis';

const Home = () => {
  const [personal, setPersonal] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchPersonal = async () => {
      const personalFromServer = await getPersonalInfo();
      setPersonal(personalFromServer);
      fetchSocialLinks();
    };
    const fetchSocialLinks = async () => {
      const socialLinksFromServer = await getSocialLinks();
      setSocialLinks(socialLinksFromServer);
      fetchSummary();
    };
    const fetchSummary = async () => {
      const summaryFromServer = await getSummary();
      setSummary(summaryFromServer);
      fetchEducation();
    };
    const fetchEducation = async () => {
      const educationFromServer = await getEducations();
      setEducation(educationFromServer);
      fetchExperience();
    };
    const fetchExperience = async () => {
      const experienceFromServer = await getExperiences();
      setExperience(experienceFromServer);
      fetchProjects();
    };
    const fetchProjects = async () => {
      const projectsFromServer = await getProjects();
      setProjects(projectsFromServer);
      fetchSkills();
    };
    const fetchSkills = async () => {
      const skillsFromServer = await getSkills();
      setSkills(skillsFromServer);
    };
    fetchPersonal();
  }, []);

  return (
    <>
      {/* Personal Information */}
      <PersonalInformation personal={personal} />
      {/* Social links */}
      <SocialLinks socialLinks={socialLinks} />
      {/* Summary */}
      <Summary summary={summary} />
      {/* Education */}
      <Education education={education} />
      {/* Experience */}
      <Experience experience={experience} />
      {/* Projects */}
      <Projects projects={projects} />
      {/* Skills */}
      <Skills skills={skills} />
    </>
  );
};

export default Home;