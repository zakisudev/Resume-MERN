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

export const getPersonalInfo = async () => {
  try {
    const res = await axios.get(PERSONAL_INFO_URL);
    if (res?.status) {
      return res?.data?.personalInformation;
    } else {
      return 'No personal information found';
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
      return res?.data?.education;
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
      return res?.data?.experience;
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
      return res?.data?.skill;
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
      return res?.data?.project;
    } else {
      return 'No project found';
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
      return res?.data?.social;
    } else {
      return 'No social link found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const login = async (user, password) => {
  try {
    const res = await axios.post(AUTH_URL, { user, password });
    if (res?.status) {
      return res?.data;
    } else {
      return 'No user found';
    }
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(AUTH_URL);
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
