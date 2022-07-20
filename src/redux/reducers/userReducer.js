import {
  USER_BUY_COURSE_FAIL,
  USER_BUY_COURSE_REQUEST,
  USER_BUY_COURSE_SUCCESS,
  USER_COURSES_FAIL,
  USER_COURSES_REQUEST,
  USER_COURSES_SUCCESS,
  USER_COURSE_DETAIL_FAIL,
  USER_COURSE_DETAIL_REQUEST,
  USER_COURSE_DETAIL_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_FOGOT_REQUEST,
  USER_FOGOT_SUCCESS,
  USER_FOGOT_FAIL,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_RESET_FAIL,

} from "../constants/userContants";

export const userResetReducer = (state = {}, action) => {
  switch (action.type) {
    case  USER_RESET_REQUEST:
      return { loading: true };
    case  USER_RESET_SUCCESS:
      return { loading: false, resetPass: action.payload };
    case USER_RESET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFogotReducer = (state = {}, action) => {
  switch (action.type) {
    case  USER_FOGOT_REQUEST:
      return { loading: true };
    case  USER_FOGOT_SUCCESS:
      return { loading: false, SuccessforgotPass: action.payload };
    case USER_FOGOT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true };
    case  USER_VERIFY_SUCCESS:
      return { loading: false, verifySuccess: action.payload };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, user: action.payload }; //
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userCoursesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COURSES_REQUEST:
      return { loading: true };
    case USER_COURSES_SUCCESS:
      return { loading: false, list: action.payload };
    case USER_COURSES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCourseDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COURSE_DETAIL_REQUEST:
      return { loading: true };
    case USER_COURSE_DETAIL_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_COURSE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const buyCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_BUY_COURSE_REQUEST:
      return { loading: true };
    case USER_BUY_COURSE_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_BUY_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
