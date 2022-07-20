import { postData, getData, putData } from "../../utils/fetchData";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_COURSES_REQUEST,
  USER_COURSES_SUCCESS,
  USER_COURSES_FAIL,
  USER_COURSE_DETAIL_REQUEST,
  USER_COURSE_DETAIL_SUCCESS,
  USER_COURSE_DETAIL_FAIL,
  USER_BUY_COURSE_REQUEST,
  USER_BUY_COURSE_SUCCESS,
  USER_BUY_COURSE_FAIL,
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
import { toast } from "react-toastify";

export const reset = (password, token) => async (dispatch) => {
  dispatch({ type: USER_RESET_REQUEST, payload: { password } });
  try {
    const data = await postData("auth/reset-password", { password }, token);

    dispatch({ type: USER_RESET_SUCCESS, payload: data });
    console.log("reset ok: ", data);
  } catch (error) {
    console.log("xac nhan  loi reset: ");
    dispatch({
      type: USER_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fogot = (email) => async (dispatch) => {
  dispatch({ type: USER_FOGOT_REQUEST, payload: { email } });
  try {
    const data = await postData("auth/forgot-password", { email });

    dispatch({ type: USER_FOGOT_SUCCESS, payload: data.result });
    console.log("gui gmail ok: ", data.result);
  } catch (error) {
    console.log("xac nhan  loi FORGOT: ");
    dispatch({
      type: USER_FOGOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verify = (email, code) => async (dispatch) => {
  dispatch({ type: USER_VERIFY_REQUEST, payload: { email, code } });
  try {
    // window.alert('fsdfsd')
    // console.log("xac nhan veryfy: ");
    const data = await postData("auth/verify-email", { email, code });
    // console.log("xac nhan thanh cong: ", data.code);
    dispatch({ type: USER_VERIFY_SUCCESS, payload: data });
    toast.success(
      <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
        サインアップに成功しました。
      </h6>
    );
  } catch (error) {
    // console.log("xac nhan  loi veryfy: ");
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
        認証に失敗しました。
      </h6>
    );
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const data = await postData("auth/login", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.result });
    // console.log("hieu ko loi: ", data);
    // console.log("hieu ko loi resulf: ", data.result);
    toast.success(
      <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
        サインインに成功しました。
      </h6>
    );
    localStorage.setItem("userInfo", JSON.stringify(data.result));
  } catch (error) {
    // console.log("hieu loi: ");
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
        サインインに失敗しました。
      </h6>
    );
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      const data = await postData("auth/register", {
        name,
        email,
        password,
      });
      // console.log("dang ki ok: ");
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      toast.info(
        <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
          メールをチェックしてください。
        </h6>
      );
    } catch (error) {
      // console.log("dang ki loi: ");
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
          サインアップに失敗しました。
        </h6>
      );
    }
  };

export const getUserDetail = () => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const data = await getData("auth/get-profile", userInfo.tokens);
    const categories = await getData("category");
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: { user: data.result, categories: categories.result },
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (dataUser) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: dataUser });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const data = await putData(
      `user/${userInfo.user.id}`,
      dataUser,
      userInfo.tokens
    );
    // console.log(data);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    toast.success(
      <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
        プロフィールを更新しました。
      </h6>
    );
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: { ...userInfo, user: data.result },
    });

    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, user: data.result })
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
    toast.error(
      <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
        プロフィールを更新できませんでした。
      </h6>
    );
  }
};

export const getUserCourses = () => async (dispatch, getState) => {
  dispatch({ type: USER_COURSES_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const data = await getData("user/getBoughtCourses", userInfo.success.token);
    dispatch({ type: USER_COURSES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_COURSES_FAIL,
      payload: message,
    });
  }
};

export const getUserCourseDetail = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_COURSE_DETAIL_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const data = await getData(
      `getCourseDetailsForStudent/${id}`,
      userInfo.success.token
    );
    dispatch({ type: USER_COURSE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_COURSE_DETAIL_FAIL,
      payload: message,
    });
  }
};

export const userbuyCourse = (course_id) => async (dispatch, getState) => {
  dispatch({ type: USER_BUY_COURSE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const data = await postData(
      `user/buyCourse`,
      { Course_ID: course_id },
      userInfo.success.token
    );

    dispatch({ type: USER_BUY_COURSE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_BUY_COURSE_FAIL,
      payload: message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  // dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_SIGNOUT });
  toast.success(
    <h6 style={{ marginTop: "9px", marginLeft: "5px", fontWeight: "bold" }}>
      サインアウトに成功しました。
    </h6>
  );
};
