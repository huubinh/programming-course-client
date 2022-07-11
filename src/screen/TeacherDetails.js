import CourseTeacher from "../components/teacherDetails/courseTeacher/CourseTeacher";
import InfoAboutTeacher from "../components/teacherDetails/infoAboutTeacher/InfoAboutTeacher";
import RatingTeacher from "../components/teacherDetails/ratingTeacher/RatingTeacher";
import "../components/teacherDetails/TeacherDetails.scss";

function TeacherDetails() {
  return (
    <div className="mt-5">
      <div className="rating p-5 mt-2">
        <RatingTeacher />
      </div>
      <div className="mt-3">
        <InfoAboutTeacher />
      </div>
      <div className="mt-3">
        <CourseTeacher />
      </div>
    </div>
  );
}
export default TeacherDetails;
