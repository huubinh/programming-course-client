import {
  COURSE_DETAIL_TRIAL_FAIL,
  COURSE_DETAIL_TRIAL_REQUEST,
  COURSE_DETAIL_TRIAL_SUCCESS,
} from "../constants/courseConstants";
import { getData } from "../../utils/fetchData";

export const getCourseDetailTrial =
  (courseId, userId, token) => async (dispatch) => {
    dispatch({ type: COURSE_DETAIL_TRIAL_REQUEST });

    try {
      let attended = false;
      let achievement = null;
      userId &&
        (await getData(`attendance/${userId}/${courseId}`, token)
          .then((res) => {
            attended = true;
          })
          .catch(() => (attended = false))) &&
        (await getData(`attendance/${userId}/${courseId}`, token)
          .then((res) => {
            achievement = res.data.result.achievement;
          })
          .catch(() => {}));
      console.log(achievement);
      const data = await getData(`course/${courseId}`);
      dispatch({
        type: COURSE_DETAIL_TRIAL_SUCCESS,
        payload: { ...data.result, attended, achievement },
      });
    } catch (error) {
      dispatch({
        type: COURSE_DETAIL_TRIAL_FAIL,
        payload: error.message,
      });
    }
  };
