import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import BannerCourse from "../../components/courseDetails/banner/BannerCourse";
// import CardBuyCourse from "../../components/courseDetails/cardBuyCourse/CardBuyCourse";
// import CourseInfo from "../../components/courseDetails/courseInfo/CourseInfo";
import { getCourseDetailTrial } from "../../redux/actions/courseAction";
import LoadingPage from "../../components/Loading/Loading";
import Button from "react-bootstrap/Button";
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
    dispatch(getCourseDetailTrial(id, userInfo.user.id, userInfo.tokens));
    //eslint-disable-next-line
  }, []);

  const [answers, setAnswers] = useState([]);
  const handleSubmit = () => {
    postData(`course/${id}/question/answer`, { answers }, userInfo.tokens).then(
      navigate(`/course/${id}`)
    );
  };
  const handleChoice = (index, choice) => {
    setAnswers((prevAnswers) => {
      prevAnswers[index] = choice;
      return prevAnswers;
    });
  };
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
              <h1 className="text-center p-0">{data.quiz.title}</h1>

              {data.quiz.questions.map((item, index) => (
                <div key={index}>
                  <h4 className="mt-3 mb-3">
                    {index + 1}. {item.question}
                  </h4>
                  <div className="row g-4">
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`A${index}`}
                          onChange={() => handleChoice(index, "A")}
                          name={`${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`A${index}`}
                        >
                          {item.answers.A}
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`B${index}`}
                          onChange={() => handleChoice(index, "B")}
                          name={`${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`B${index}`}
                        >
                          {item.answers.B}
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`C${index}`}
                          onChange={() => handleChoice(index, "C")}
                          name={`${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`C${index}`}
                        >
                          {item.answers.C}
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`D${index}`}
                          onChange={() => handleChoice(index, "D")}
                          name={`${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`D${index}`}
                        >
                          {item.answers.D}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="submit"
                size="lg"
                variant="danger"
                onClick={handleSubmit}
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
