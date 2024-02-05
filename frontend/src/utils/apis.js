import axios from 'axios';
import {
  AUTH_URL,
  PERSONAL_INFO_URL,
  SUMMARY_URL,
  EDUCATION_URL,
  EXPERIENCE_URL,
  SKILL_URL,
  PROJECT_URL,
  SOCIAL_URL,
} from '../constants/urls';

// Auth Requests
export const register = async (user) => {
  try {
    const res = await axios.post(`${AUTH_URL}/register`, user);
    if (res?.status) {
      return res?.data;
    } else {
      return 'No user found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, user);
    if (res?.status) {
      return res?.data;
    } else {
      return 'No user found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(`${AUTH_URL}/logout`);
    if (res.status) {
      return res.data;
    } else {
      return 'No user found';
    }
  } catch (err) {
    console.error(err);
    return err?.response?.data;
  }
};

export const getMe = async (userId) => {
  try {
    const res = await axios.get(`${AUTH_URL}/profile/${userId}`);
    if (res.status) {
      return res?.data;
    } else {
      return res?.message;
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const updateMe = async (userId, user) => {
  try {
    if (!user.avatar) {
      const res = await axios.put(`${AUTH_URL}/profile/${userId}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status) {
        return res.data;
      } else {
        return 'No user found';
      }
    } else if (user.avatar) {
      const res = await axios.put(`${AUTH_URL}/profile/${userId}`, user, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status) {
        return res?.data;
      } else {
        return 'No user found';
      }
    }
  } catch (err) {
    return err?.response?.data;
  }
};

// Get Requests
export const getPersonalInfo = async (userId) => {
  try {
    const res = await axios.get(`${PERSONAL_INFO_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.personal;
    } else {
      return res;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const getSocialLinks = async (userId) => {
  try {
    const res = await axios.get(`${SOCIAL_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.socials;
    } else {
      return res;
    }
  } catch (err) {
    return err.response?.data;
  }
};

export const getSummary = async (userId) => {
  try {
    const res = await axios.get(`${SUMMARY_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.summary;
    } else {
      return res;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const getEducations = async (userId) => {
  try {
    const res = await axios.get(`${EDUCATION_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.educations;
    } else {
      return res;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const getExperiences = async (userId) => {
  try {
    const res = await axios.get(`${EXPERIENCE_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.works;
    } else {
      return res;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const getSkills = async (userId) => {
  try {
    const res = await axios.get(`${SKILL_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.skills;
    } else {
      return res;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const getProjects = async (userId) => {
  try {
    const res = await axios.get(`${PROJECT_URL}/${userId}`);
    if (res?.status) {
      return res?.data?.projects;
    } else {
      return res;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

// Add and Update requests
export const addPersonalInfo = async (personalInfo) => {
  try {
    const res = await axios.post(PERSONAL_INFO_URL, personalInfo);
    if (res.status) {
      return res.data;
    } else {
      return 'No personal information found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updatePersonalInfo = async (personalId, personalInfo) => {
  if (!personalInfo.avatar) {
    try {
      const res = await axios.put(
        `${PERSONAL_INFO_URL}/${personalId}/`,
        personalInfo
      );
      if (res.status) {
        return res.data;
      } else {
        return 'No personal information found';
      }
    } catch (err) {
      return err?.response?.data;
    }
  } else if (personalInfo.avatar) {
    try {
      const res = await axios.put(
        `${PERSONAL_INFO_URL}/${personalId}/`,
        personalInfo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (res.status) {
        return res.data;
      } else {
        return 'No personal information found';
      }
    } catch (err) {
      return err?.response?.data;
    }
  }
};

export const addEducation = async (education) => {
  try {
    const res = await axios.post(`${EDUCATION_URL}`, education);
    if (res.status) {
      return res.data;
    } else {
      return 'No education found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updateEducation = async (educationId, education) => {
  try {
    const res = await axios.put(`${EDUCATION_URL}/${educationId}`, education);
    if (res.status) {
      return res.data;
    } else {
      return 'No education found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const addSummary = async (summary) => {
  try {
    const res = await axios.post(`${SUMMARY_URL}`, summary);
    if (res.status) {
      return res.data;
    } else {
      return 'No summary found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updateSummary = async (summaryId, summary) => {
  try {
    const res = await axios.put(`${SUMMARY_URL}/${summaryId}`, summary);
    if (res.status) {
      return res.data;
    } else {
      return 'No summary found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const addSocialLinks = async (social) => {
  try {
    const res = await axios.post(SOCIAL_URL, social);
    if (res.status) {
      return res.data;
    } else {
      return 'No social link found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updateSocialLinks = async (userId, social) => {
  try {
    const res = await axios.put(`${SOCIAL_URL}/${userId}`, social);
    if (res.status) {
      return res.data;
    } else {
      return 'No social link found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const addSkill = async (skill) => {
  try {
    const res = await axios.post(SKILL_URL, skill);
    if (res.status) {
      return res.data;
    } else {
      return 'No skill found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updateSkill = async (skillId, skillData) => {
  try {
    const res = await axios.put(`${SKILL_URL}/${skillId}`, {
      skill: skillData[0]?.skill,
      type: skillData[0]?.type,
      _id: skillData[0]?._id,
    });
    if (res.status) {
      return res.data;
    } else {
      return 'No skill found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const addExperience = async (experience) => {
  try {
    const res = await axios.post(EXPERIENCE_URL, experience);
    if (res.status) {
      return res.data;
    } else {
      return 'No experience found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updateExperience = async (experienceId, experience) => {
  try {
    const res = await axios.put(
      `${EXPERIENCE_URL}/${experienceId}`,
      experience
    );
    if (res.status) {
      return res.data;
    } else {
      return 'No experience found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const addProject = async (project) => {
  try {
    const res = await axios.post(PROJECT_URL, project, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status) {
      return res.data;
    } else {
      return 'No project found';
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const updateProject = async (projectId, project) => {
  try {
    if (!project.image) {
      const res = await axios.put(`${PROJECT_URL}/${projectId}`, project);
      if (res.status) {
        return res.data;
      } else {
        return res;
      }
    } else if (project.image) {
      const res = await axios.put(`${PROJECT_URL}/${projectId}`, project, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status) {
        return res.data;
      } else {
        return res;
      }
    }
  } catch (err) {
    return err?.response?.data;
  }
};
