import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import BannerCourse from "../../components/courseDetails/banner/BannerCourse";
// import CardBuyCourse from "../../components/courseDetails/cardBuyCourse/CardBuyCourse";
// import CourseInfo from "../../components/courseDetails/courseInfo/CourseInfo";
import { getCourseDetailTrial } from "../../redux/actions/courseAction";
import LoadingPage from "../../components/Loading/Loading";
import Button from "react-bootstrap/Button";
import CourseContent from "../../components/courseDetails/courseInfo/courseContent/CourseContent";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetchData";
import ReactPlayer from "react-player";
import VideoPlayer from "./VideoPlayer";

export default function CourseDetails() {
  const dispatch = useDispatch();
  const courseDetailTrial = useSelector((state) => state.courseDetailTrial);
  const { data, loading } = courseDetailTrial;
  const { id } = useParams();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    video: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getCourseDetailTrial(id, userInfo.user.id, userInfo.tokens));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) setLesson(data.lessons[0]);
    //eslint-disable-next-line
  }, [data]);

  return (
    <>
      {loading && <LoadingPage />}
      {data && (
        <div
          style={{
            minHeight: "100vh",
            paddingTop: "60px",
          }}
        >
          <img
            src={data.image}
            alt="course"
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              opacity: "0.8",
            }}
          />
          <div className="container">
            <div className="row align-items-center">
              <div className="col-8">
                {" "}
                <div
                  className="card"
                  style={{
                    width: "100%%",
                    height: "auto",
                    padding: "20px",
                    marginTop: "60px",
                  }}
                >
                  <h4 className="mb-3">{data.name}</h4>
                  {lesson.video.includes("youtube") ? (
                    <iframe
                      width="100%"
                      height="400px"
                      src={lesson.video.replace("watch?v=", "embed/")}
                      title="video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <VideoPlayer videoSrc={lesson.video} />
                  )}
                  <h5 style={{ marginTop: "20px" }}>{lesson.name}</h5>
                  <h6 style={{ marginTop: "10px" }}>{lesson.description}</h6>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="card"
                  style={{
                    width: "100%%",
                    height: "auto",
                    padding: "36px",
                    marginTop: "60px",
                  }}
                >
                  <h5 className="mb-3" style={{ marginLeft: "-4px" }}>
                    レッソン一覧
                  </h5>
                  <div className="list-group" role="tablist">
                    <a
                      className="list-group-item list-group-item-action active"
                      data-bs-toggle="list"
                      href="!#"
                      role="tab"
                      onClick={() => setLesson(data.lessons[0])}
                    >
                      レッソン 1： {data.lessons[0].name}
                    </a>
                    {data.lessons.map(
                      (item, index) =>
                        index !== 0 && (
                          <a
                            key={index}
                            className="list-group-item list-group-item-action"
                            data-bs-toggle="list"
                            href="!#"
                            role="tab"
                            onClick={() => setLesson(data.lessons[index])}
                          >
                            レッソン {index + 1}： {item.name}
                          </a>
                        )
                    )}
                  </div>
                  <h5 className="mb-3 mt-4" style={{ marginLeft: "-4px" }}>
                    ファイナルクイズ
                  </h5>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => {
                      navigate(`/course/${id}/quiz`);
                    }}
                    style={{ width: "175px" }}
                    disabled={typeof data.achievement === "number"}
                  >
                    クイズに答える
                  </Button>
                  <h5 className="mt-4">
                    成績：
                    {typeof data.achievement === "number" ? (
                      <span style={{ color: "#752ad1" }}>
                        {data.achievement}/10
                      </span>
                    ) : (
                      "ありません。"
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
