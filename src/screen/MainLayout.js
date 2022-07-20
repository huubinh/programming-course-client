import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import Home from "./Home";
import TeacherDetails from "./TeacherDetails";
import CourseDetails from "./course/CourseDetails";
import LessonDetails from "./lesson/LessonDetails";
import Quiz from "./quiz/Quiz";
import Cart from "./Cart";
import Category from "./category/Category";
import { Route, Routes } from "react-router-dom";
import Tag from "./category/Tag";
import MyCourse from "./user/MyCourse";
import UserProfileScreen from "./user/UserProfile";
import Test from "./Test";
import MyCourseDetail from "./MyCourseDetail/MyCourseDetail";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

export default function MainLayout() {
  return (
    <div className="App">
      <div id="header">
        <Header />
      </div>
      <div id="main">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/course/:id/lessons" element={<LessonDetails />} />
          <Route path="/course/:id/quiz" element={<Quiz />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/tag/:id" element={<Tag />} />
          <Route path="/teacher/:id" element={<TeacherDetails />} />
          <Route path="/user/my-course" element={<MyCourse />} />
          <Route path="/user/profile" element={<UserProfileScreen />} />
          <Route
            path="/user/my-course/:id"
            element={<MyCourseDetail />}
          ></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </div>
      <div style={{ height: "40px" }}></div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
