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
import { useNavigate } from 'react-router-dom';

const Home = ({ theme }) => {
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : localStorage.getItem('userId');
  const navigate = useNavigate();

  const [personal, setPersonal] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const [summary, setSummary] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const [projects, setProjects] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const fetchPersonal = async () => {
      const personalFromServer = await getPersonalInfo(userId);
      if (personalFromServer?.status) {
        setPersonal(personalFromServer?.PersonalInfo[0]);
      } else {
        setPersonal(personalFromServer);
      }
      fetchSocialLinks();
    };

    const fetchSocialLinks = async () => {
      const socialLinksFromServer = await getSocialLinks(userId);
      if (socialLinksFromServer?.status) {
        setSocialLinks(socialLinksFromServer?.SocialLink);
      } else {
        setSocialLinks(socialLinksFromServer);
      }
      fetchSummary();
    };

    const fetchSummary = async () => {
      const summaryFromServer = await getSummary(userId);
      if (summaryFromServer?.status) {
        setSummary(summaryFromServer);
      } else {
        setSummary(summaryFromServer);
      }
      fetchEducation();
    };

    const fetchEducation = async () => {
      const educationFromServer = await getEducations(userId);
      if (educationFromServer?.status) {
        setEducation(educationFromServer?.Education);
      } else {
        setEducation(educationFromServer);
      }
      fetchExperience();
    };

    const fetchExperience = async () => {
      const experienceFromServer = await getExperiences(userId);
      if (experienceFromServer?.status) {
        setExperience(experienceFromServer?.Experience);
      } else {
        setExperience(experienceFromServer);
      }
      fetchProjects();
    };

    const fetchProjects = async () => {
      const projectsFromServer = await getProjects(userId);
      if (projectsFromServer?.status) {
        setProjects(projectsFromServer?.Projects);
      } else {
        setProjects(projectsFromServer);
      }
      fetchSkills();
    };

    const fetchSkills = async () => {
      const skillsFromServer = await getSkills(userId);
      if (skillsFromServer?.status) {
        setSkills(skillsFromServer?.Skills);
      } else {
        setSkills(skillsFromServer);
      }
    };
    fetchPersonal();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/admin/login', { replace: true });
    }
  }, [userId, navigate]);

  return (
    <>
      {/* Personal Information */}
      {personal && <PersonalInformation personal={personal} theme={theme} />}

      {/* Social links */}
      {personal && socialLinks && (
        <SocialLinks socialLinks={socialLinks} theme={theme} />
      )}

      {/* Summary */}
      {personal && summary && <Summary summary={summary} theme={theme} />}

      {/* Education */}
      {personal && education && (
        <Education education={education} theme={theme} />
      )}

      {/* Experience */}
      {personal && experience && (
        <Experience experience={experience} theme={theme} />
      )}

      {/* Skills */}
      {personal && skills && <Skills skills={skills} theme={theme} />}

      {/* Projects */}
      {personal && projects && <Projects projects={projects} theme={theme} />}

      {/* Footer */}
      <Footer theme={theme} />
    </>
  );
};

export default Home;
