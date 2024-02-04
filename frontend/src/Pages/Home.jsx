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
import Footer from '../components/common/Footer';

const Home = ({ theme }) => {
  const userId = localStorage.getItem('token');
  const [personal, setPersonal] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchPersonal = async () => {
      const personalFromServer = await getPersonalInfo(userId);
      setPersonal(personalFromServer?.PersonalInfo);
      fetchSocialLinks();
    };
    const fetchSocialLinks = async () => {
      const socialLinksFromServer = await getSocialLinks(userId);
      setSocialLinks(socialLinksFromServer);
      fetchSummary();
    };
    const fetchSummary = async () => {
      const summaryFromServer = await getSummary(userId);
      setSummary(summaryFromServer[0]);
      fetchEducation();
    };
    const fetchEducation = async () => {
      const educationFromServer = await getEducations(userId);
      setEducation(educationFromServer);
      fetchExperience();
    };
    const fetchExperience = async () => {
      const experienceFromServer = await getExperiences(userId);
      setExperience(experienceFromServer);
      fetchProjects();
    };
    const fetchProjects = async () => {
      const projectsFromServer = await getProjects(userId);
      setProjects(projectsFromServer);
      fetchSkills();
    };
    const fetchSkills = async () => {
      const skillsFromServer = await getSkills(userId);
      setSkills(skillsFromServer);
    };
    fetchPersonal();
  }, [userId]);

  return (
    <>
      {/* Profile */}
      {/* Personal Information */}
      <PersonalInformation personal={personal} theme={theme} />
      {/* Social links */}
      <SocialLinks socialLinks={socialLinks} theme={theme} />
      {/* Summary */}
      <Summary summary={summary} theme={theme} />
      {/* Education */}
      <Education education={education} theme={theme} />
      {/* Experience */}
      <Experience experience={experience} theme={theme} />
      {/* Skills */}
      <Skills skills={skills} theme={theme} />
      {/* Projects */}
      <Projects projects={projects} theme={theme} />
      <Footer theme={theme} />
    </>
  );
};

export default Home;
