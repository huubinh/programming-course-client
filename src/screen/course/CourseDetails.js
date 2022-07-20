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
import { toast } from "react-toastify";

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
            <div
              className="card"
              style={{
                width: "100%%",
                height: "auto",
                padding: "36px",
                marginTop: "60px",
              }}
            >
              <div className="row g-2">
                <div className="col-9">
                  <h1 style={{ padding: 0 }}>{data.name}</h1>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  {data.attended ? (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        navigate(`/course/${id}/lessons`);
                      }}
                      style={{ width: "175px" }}
                    >
                      コースを続ける
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => {
                        if (userInfo) {
                          postData(
                            "/attendance/add",
                            { userId: userInfo.user.id, courseId: id },
                            userInfo.tokens
                          )
                            .then(() => {
                              toast.success(
                                <h6
                                  style={{
                                    marginTop: "9px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  コースに参加しました。
                                </h6>
                              );
                              navigate(`/course/${id}/lessons`);
                            })
                            .catch(() => {
                              toast.error(
                                <h6
                                  style={{
                                    marginTop: "9px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  コースに参加できませんでした。
                                </h6>
                              );
                            });
                        } else navigate("/login");
                      }}
                      style={{ width: "175px" }}
                    >
                      コースに参加
                    </Button>
                  )}
                </div>
                <div className="col-10" style={{ color: "#752ad1" }}>
                  <h6 style={{ padding: 0 }}>{data.category[0].name}</h6>
                </div>
                <div className="col-10">
                  <h5>{data.description}</h5>
                </div>
                <div className="col-12">
                  <CourseContent lessons={data.lessons} />
                </div>
              </div>

              {data.attended && (
                <>
                  <h5 className="mb-3 mt-4" style={{ marginLeft: "-4px" }}>
                    ファイナルクイズ
                  </h5>
                  <div className="row align-items-center">
                    <div className="col-3">
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
                    </div>
                    <div className="col-12">
                      <h5 className="mt-3">
                        成績：
                        {typeof data.achievement === "number" ? (
                          <span style={{ color: "#752ad1" }}>
                            {data.achievement}/10
                          </span>
                        ) : (
                          "まだありません。"
                        )}
                      </h5>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
