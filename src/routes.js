import Home from "./components/home/Home";
import CourseDetails from "./components/courseDetails/CourseDetails";
import Category from "./components/category/Category";

export const routers = [
  {
    path: "/",
    label: "courses-details",
    main: () => {
      <CourseDetails />;
    },
  },
  {
    path: "",
    label: "error",
    main: () => {
      <Home />;
    },
  },
  {
    path: "",
    label: "",
    main: () => {
      <Category />;
    },
  },
];
