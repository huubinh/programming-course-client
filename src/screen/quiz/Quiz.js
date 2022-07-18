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
import Form from "react-bootstrap/Form";

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
              <h1 style={{ padding: 0 }}>{data.quiz.title}</h1>

              {data.quiz.questions.map((item) => (
                <>
                  <h4 className="mt-3 mb-3">{item.question}</h4>
                  <Form>
                    <div className="row g-3">
                      <div className="col-6">
                        <Form.Check type="radio" label={item.answers.A} />
                      </div>
                      <div className="col-6">
                        <Form.Check type="radio" label={item.answers.B} />
                      </div>
                      <div className="col-6">
                        <Form.Check type="radio" label={item.answers.C} />
                      </div>
                      <div className="col-6">
                        <Form.Check type="radio" label={item.answers.D} />
                      </div>
                    </div>
                  </Form>
                </>
              ))}
              <Button
                type="submit"
                size="lg"
                variant="danger"
                onClick={() => {
                  navigate(`/course/${id}`);
                }}
                style={{ width: "150px", marginTop: "30px" }}
              >
                サブミット
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
