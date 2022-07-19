import React from "react";
import CourseItem from "./CourseItem";

export default function CoursesSection({
  categories,
  courses,
  number,
  showAchievements,
}) {
  return (
    // <div className="mb-2">
    <div
      className={number === 4 ? "row g-4" : "row g-4 justify-content-center"}
    >
      {courses.map((item, index) => (
        <div
          className={
            number === 4 ? "col-lg-3 col-md-4 col-sm-6 col-12 " : "col-lg-5"
          }
          key={index}
        >
          <CourseItem
            course={item}
            category={categories.find((i) => i.id === item.categoryId)}
            showAchievements={showAchievements}
          />
        </div>
      ))}
    </div>
    // </div>
  );
}
