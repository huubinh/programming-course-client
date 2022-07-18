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

export default function CourseDetails() {
  const dispatch = useDispatch();
  const courseDetailTrial = useSelector((state) => state.courseDetailTrial);
  const { data, loading } = courseDetailTrial;
  const { id } = useParams();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourseDetailTrial(id));
    userInfo
      ? dispatch(getCourseDetailTrial(id, userInfo.user.id, userInfo.tokens))
      : dispatch(getCourseDetailTrial(id));
    //eslint-disable-next-line
  }, [dispatch, id]);

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
                  <iframe
                    width="100%"
                    height="400px"
                    src={data.lessons[0].video.replace("watch?v=", "embed/")}
                    title="video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h5 style={{ marginTop: "20px" }}>{data.lessons[0].name}</h5>
                  <h6 style={{ marginTop: "10px" }}>
                    {data.lessons[0].description}
                  </h6>
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
                  <CourseContent lessons={data.lessons} />
                </div>
              </div>
              <div className="col-8">
                <div
                  className="card"
                  style={{
                    width: "100%%",
                    height: "auto",
                    padding: "20px",
                    marginTop: "60px",
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-4">
                      <Button
                        variant="success"
                        size="lg"
                        onClick={() => {
                          navigate(`/course/${id}/quiz`);
                        }}
                        style={{ width: "175px" }}
                      >
                        クイズに答える
                      </Button>
                    </div>
                    <div className="col-8">
                      <h5>
                        成績：
                        {data.achievement
                          ? data.achievement
                          : "まだありません。"}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
