import React from "react";
import "./category.scss";
import TagHeader from "../../components/tags/TagHeader";
import TagBody from "../../components/tags/TagBody";

export default function Tag() {
  return (
    <div style={{ margin: "65px 0" }}>
      <TagHeader />
      <div className="container">
        <TagBody />
      </div>
    </div>
  );
}
