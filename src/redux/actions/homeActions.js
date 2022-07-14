import { getData } from "../../utils/fetchData";
import {
  HOME_LIST_FAIL,
  HOME_LIST_REQUEST,
  HOME_LIST_SUCCESS,
} from "../constants/homeConstants";

export const getHomeList = (params) => async (dispatch) => {
  dispatch({
    type: HOME_LIST_REQUEST,
  });
  try {
    // console.log(params);
    const categories = await getData("category");
    const courses = await getData(
      `${
        params
          ? `course${
              params.name !== "" && params.category !== ""
                ? `?name=${params.name}&categoryId=${params.category}`
                : params.name !== ""
                ? `?name=${params.name}`
                : params.category !== ""
                ? `?categoryId=${params.category}`
                : ""
            }`
          : "course"
      }`
    );

    dispatch({
      type: HOME_LIST_SUCCESS,
      payload: {
        categories: [...categories.result],
        courses: [...courses.results],
      },
    });
  } catch (error) {
    dispatch({
      type: HOME_LIST_FAIL,
      payload: error.message,
    });
  }
};
