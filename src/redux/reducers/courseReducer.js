import {
  COURSE_DETAIL_TRIAL_FAIL,
  COURSE_DETAIL_TRIAL_REQUEST,
  COURSE_DETAIL_TRIAL_SUCCESS,
} from "../constants/courseConstants";

export const courseDetailTrialReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DETAIL_TRIAL_REQUEST:
      return { loading: true };
    case COURSE_DETAIL_TRIAL_SUCCESS:
      return { loading: false, data: action.payload };
    case COURSE_DETAIL_TRIAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
