import "./about.scss";
import React from "react";
import { Accordion } from "react-bootstrap";

export default function CourseContent({ lessons }) {
  return (
    <div className="mt-4">
      <h5 className="mb-3" style={{ marginLeft: "-4px" }}>
        レッソン一覧
      </h5>
      <div style={{ marginLeft: "-2px" }}>
        <Accordion>
          {lessons.map((item, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>
                <h6>
                  レッソン {index + 1}： {item.name}
                </h6>
              </Accordion.Header>

              <Accordion.Body key={index}>{item.description}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
