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

// Get Requests
export const getPersonalInfo = async () => {
  try {
    const res = await axios.get(PERSONAL_INFO_URL);
    if (res?.status) {
      return res?.data?.personal;
    } else {
      return 'No personal information found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getSocialLinks = async () => {
  try {
    const res = await axios.get(SOCIAL_URL);
    if (res?.status) {
      return res?.data?.socials;
    } else {
      return 'No social link found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getSummary = async () => {
  try {
    const res = await axios.get(SUMMARY_URL);
    if (res?.status) {
      return res?.data?.summary;
    } else {
      return 'No summary found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getEducations = async () => {
  try {
    const res = await axios.get(EDUCATION_URL);
    if (res?.status) {
      return res?.data?.educations;
    } else {
      return 'No education found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getExperiences = async () => {
  try {
    const res = await axios.get(EXPERIENCE_URL);
    if (res?.status) {
      return res?.data?.works;
    } else {
      return 'No experience found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getSkills = async () => {
  try {
    const res = await axios.get(SKILL_URL);
    if (res?.status) {
      return res?.data?.skills;
    } else {
      return 'No skill found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getProjects = async () => {
  try {
    const res = await axios.get(PROJECT_URL);
    if (res?.status) {
      return res?.data?.projects;
    } else {
      return 'No project found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

// Auth Requests
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
      return res.data;
    } else {
      return 'No user found';
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

// Add and Update requests
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
