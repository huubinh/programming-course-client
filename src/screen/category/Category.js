import React from "react";
import "./category.scss";
import CategoryHeader from "../../components/category/CategoryHeader";
import CategoryBody from "../../components/category/CategoryBody";

export default function Category({ props }) {
  return (
    <div style={{ margin: "65px 0" }}>
      <CategoryHeader />
      <CategoryBody />
    </div>
  );
}
