import React from "react";
import CourseItem from "./CourseItem";

export default function CoursesSection({ categories, courses }) {
  return (
    <div className="mb-2">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {courses.map((item, index) => (
          <CourseItem
            key={index}
            course={item}
            category={categories.find((i) => i.id === item.categoryId)}
          />
        ))}
      </div>
    </div>
  );
}
