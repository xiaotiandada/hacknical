import { createAction, createActions } from 'redux-actions';
import objectAssign from 'object-assign';
import Api from 'API';

/**
 * initial
 */
const initialResume = createAction('INITIAL_RESUME');
const fetchResume = () => (dispatch, getState) => {
  Api.resume.getResume().then((result) => {
    result && dispatch(initialResume(result));
  });
};

const saveResume = () => (dispatch, getState) => {
  const { resume } = getState();
  const postResume = objectAssign({}, resume);
  delete postResume.loading;
  Api.resume.setResume(JSON.stringify(postResume)).then((result) => {
    // dispatch(initialResume(result));
  });
};

/**
 * loading
 */
const toggleLoading = createAction('TOGGLE_LOADING');

/**
 * info
 */
const handleInfoChange = createAction('HANDLE_INFO_CHANGE');

/**
 * Education
 */
const {
  handleEduChange,
  addEducation,
  deleteEducation
} = createActions({
  HANDLE_EDU_CHANGE: (edu, index) => ({ edu, index })
}, 'ADD_EDUCATION', 'DELETE_EDUCATION');

/**
 * WorkExperience
 */
const {
  deleteWorkProject,
  addWorkProjectDetail,
  deleteWorkProjectDetail,
  handleWorkProjectChange,
  handleWorkExperienceChange,
  addWorkExperience,
  deleteWorkExperience,
  addWorkProject
} = createActions({
  DELETE_WORK_PROJECT: (workIndex, projectIndex) => ({ workIndex, projectIndex }),
  ADD_WORK_PROJECT_DETAIL: (detail, workIndex, projectIndex) => ({ detail, workIndex, projectIndex }),
  DELETE_WORK_PROJECT_DETAIL: (workIndex, projectIndex, detailIndex) => ({ workIndex, projectIndex, detailIndex }),
  HANDLE_WORK_PROJECT_CHANGE: (workProject, workIndex, projectIndex) => ({ workProject, workIndex, projectIndex }),
  HANDLE_WORK_EXPERIENCE_CHANGE: (workExperience, index) => ({ workExperience, index })
}, 'ADD_WORK_EXPERIENCE', 'DELETE_WORK_EXPERIENCE', 'ADD_WORK_PROJECT');

/**
 * PersonalProject
 */
const {
  handlePersonalProjectChange,
  addProjectTech,
  deleteProjectTech,
  addPersonalProject,
  deletePersonalProject
} = createActions({
  HANDLE_PERSONAL_PROJECT_CHANGE: (personalProject, index) => ({ personalProject, index }),
  ADD_PROJECT_TECH: (tech, index) => ({ tech, index }),
  DELETE_PROJECT_TECH: (projectIndex, techIndex) => ({ projectIndex, techIndex })
}, 'ADD_PERSONAL_PROJECT', 'DELETE_PERSONAL_PROJECT');

/**
 * others
 */
const {
  changeSupplement,
  changeSocialLink,
  handleOthersInfoChange,
  addLocation,
  deleteLocation,
  addSupplement,
  deleteSupplement
} = createActions(
  {
    CHANGE_SUPPLEMENT: (supplement, index) => ({ supplement, index }),
    CHANGE_SOCIAL_LINK: (url, index) => ({ url, index })
  },
  'HANDLE_OTHERS_INFO_CHANGE',
  'ADD_LOCATION',
  'DELETE_LOCATION',
  'ADD_SUPPLEMENT',
  'DELETE_SUPPLEMENT'
);

// resume share
const setPubResumeStatus = createAction('SET_PUB_RESUME_STATUS');
const initialPubResumeStatus = createAction('INITIAL_PUB_RESUME_STATUS', (openShare, url) => ({ openShare, url }));
const fetchPubResumeStatus = () => (dispatch, getState) => {
  Api.resume.getPubResumeStatus().then((result) => {
    const { openShare, url } = result;
    dispatch(initialPubResumeStatus(openShare, url));
  });
};
const postShareStatus = () => (dispatch, getState) => {
  const { openShare } = getState().resume.shareInfo;
  Api.resume.postPubResumeStatus(!openShare).then(() => {
    dispatch(setPubResumeStatus(!openShare));
  });
};

export default {
  // initial
  initialResume,
  fetchResume,
  // resume operation
  saveResume,
  // loading
  toggleLoading,
  // info
  handleInfoChange,
  // edu
  addEducation,
  deleteEducation,
  handleEduChange,
  // workExperience
  addWorkExperience,
  deleteWorkExperience,
  addWorkProject,
  deleteWorkProject,
  addWorkProjectDetail,
  deleteWorkProjectDetail,
  handleWorkProjectChange,
  handleWorkExperienceChange,
  // personalProjects
  addPersonalProject,
  deletePersonalProject,
  handlePersonalProjectChange,
  addProjectTech,
  deleteProjectTech,
  // others
  changeSupplement,
  changeSocialLink,
  handleOthersInfoChange,
  addLocation,
  deleteLocation,
  addSupplement,
  deleteSupplement,
  // resume share
  setPubResumeStatus,
  initialPubResumeStatus,
  fetchPubResumeStatus,
  postShareStatus
}
