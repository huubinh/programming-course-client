import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userprofile.scss";
import axios from "axios";
import {
  getUserDetail,
  updateUserProfile,
} from "../../../redux/actions/userActions";
import LoadingPage from "../../Loading/Loading";
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from "../../../redux/constants/userContants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CoursesSection from "../../course/Courses";

export default function UserProfile(props) {
  const [dataUser, setDataUser] = useState({
    name: "",
    avatar: "",
    cover: "",
  });
  const [avatar, setAvatar] = useState("");
  // console.log(avatar);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { data, loading } = userDetails;

  const uploadApi = "https://api.metahub.market/api/uploads";

  useEffect(() => {
    if (!data) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetail());
    } else {
      setDataUser({
        name: data.user.user.name,
        avatar: data.user.user.avatar,
        cover: data.user.user.cover,
      });
    }
  }, [dispatch, data]);

  const avatarInputRef = useRef();
  const coverPhotoInputRef = useRef();

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(uploadApi, formData);
    dispatch(updateUserProfile({ ...dataUser, avatar: res.data.data }));
    dispatch(getUserDetail());
  };

  const handleChangeCoverPhoto = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(uploadApi, formData);
    dispatch(updateUserProfile({ ...dataUser, cover: res.data.data }));
    dispatch(getUserDetail());
  };

  const handleChangeName = (e) => {
    setDataUser({ ...dataUser, name: e.target.value });
  };

  const imageUpLoad = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "uploadimage");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/drvrg0ixi/image/upload",
      formData
    );
    const data = res.data;
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let media;
    // if (avatar !== "") media = await imageUpLoad(avatar);
    // dispatch(
    //   updateUserProfile({
    //     name: dataUser.name,
    //     // User_DoB: dataUser.User_DoB,
    //     // User_image: media ? media : user.information[0].User_image,
    //   })
    // );
    // dispatch({ type: USER_DETAILS_RESET });
    dispatch(updateUserProfile(dataUser));
    dispatch(getUserDetail());
  };

  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [search, setSearch] = useState({ name: "", category: "" });

  const handleSearch = () => {
    setSearch({ name: searchName, category: searchCategory });
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
          className="user-profile"
        >
          <img
            src={data.user.user.cover}
            alt="course"
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              opacity: "0.8",
              zIndex: -1,
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div
                  className="card left-information"
                  style={{
                    width: "100%%",
                    height: "auto",
                    padding: "20px",
                    marginTop: "60px",
                  }}
                >
                  <div className="change-avatar">
                    <img
                      src={
                        avatar !== ""
                          ? URL.createObjectURL(avatar)
                          : data.user.user.avatar
                      }
                      className="img-fluid image-avatar"
                      alt="avatar"
                    ></img>
                    <div className="row">
                      <div className="col-6">
                        <div className="text-center btn-upload">
                          <button
                            onClick={() => avatarInputRef.current.click()}
                            className="btn btn-primary btn-sm "
                          >
                            アバターを編集
                          </button>
                          <input
                            onChange={handleChangeAvatar}
                            multiple={false}
                            ref={avatarInputRef}
                            type="file"
                            hidden
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center btn-upload">
                          <button
                            onClick={() => coverPhotoInputRef.current.click()}
                            className="btn btn-success btn-sm"
                          >
                            カバー写真を編集
                          </button>
                          <input
                            onChange={handleChangeCoverPhoto}
                            multiple={false}
                            ref={coverPhotoInputRef}
                            type="file"
                            hidden
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="list-group list-menu-profile"
                    id="list-tab"
                    role="tablist"
                  >
                    <a
                      className="list-group-item list-group-item-action active"
                      id="list-profile-list"
                      data-bs-toggle="list"
                      href="#list-profile"
                      role="tab"
                      aria-controls="list-profile"
                    >
                      <i className="fa fa-user" aria-hidden="true"></i>
                      マイプロフィール
                    </a>
                    <a
                      className="list-group-item list-group-item-action"
                      id="list-course-list"
                      data-bs-toggle="list"
                      href="#list-course"
                      role="tab"
                      aria-controls="list-course"
                    >
                      <i className="fa fa-bookmark" aria-hidden="true"></i>
                      マイコース
                    </a>
                    <a
                      className="list-group-item list-group-item-action"
                      id="list-achievements-list"
                      data-bs-toggle="list"
                      href="#list-achievements"
                      role="tab"
                      aria-controls="list-achievements"
                    >
                      <i
                        className="fa fa-star"
                        aria-hidden="true"
                        style={{ marginLeft: "-2px" }}
                      ></i>
                      成績
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div
                  className="card"
                  style={{
                    width: "100%%",
                    height: "auto",
                    padding: "36px",
                    marginTop: "60px",
                  }}
                >
                  <div
                    className="tab-content right-information"
                    id="nav-tabContent"
                  >
                    <div
                      className="tab-pane fade show active information-details-user"
                      id="list-profile"
                      role="tabpanel"
                      aria-labelledby="list-profile-list"
                    >
                      <h3 className="text-center text-title">
                        マイプロフィール
                      </h3>
                      <form
                        className="form-edit-information"
                        onSubmit={handleSubmit}
                      >
                        <div className="mb-3">
                          <label className="form-label">名前</label>
                          <input
                            type="text"
                            className="form-control"
                            value={dataUser["name"]}
                            onChange={handleChangeName}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">メール</label>
                          <input
                            disabled
                            type="email"
                            className="form-control"
                            value={data.user.user.email}
                          />
                        </div>
                        <div className="mt-5 btn-save-information d-flex justify-content-center">
                          <button
                            type="submit"
                            size="lg"
                            className="btn btn-danger"
                          >
                            編集
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="list-course"
                      role="tabpanel"
                      aria-labelledby="list-course-list"
                    >
                      <div className="row justify-content-center">
                        <div className="col-12 mb-2 text-center">
                          <h3>マイコース</h3>
                        </div>
                        <div className="col-10 d-flex justify-content-end">
                          <Form.Control
                            placeholder="キーワード検索"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                handleSearch();
                              }
                            }}
                            style={{ width: "268px" }}
                          />

                          <Form.Select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            style={{ width: "200px", marginLeft: "23px" }}
                          >
                            <option value="">全てのカテゴリー</option>
                            {data.categories.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Select>

                          <Button
                            variant="primary"
                            onClick={() => {
                              handleSearch();
                            }}
                            style={{ width: "50px", marginLeft: "20px" }}
                          >
                            <i className="fa fa-search"></i>
                          </Button>
                        </div>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <div className="mt-3">
                          <CoursesSection
                            categories={data.categories}
                            courses={data.user.courseOfUser
                              .filter(
                                (item) =>
                                  !search.name ||
                                  item.name
                                    .toLowerCase()
                                    .includes(search.name.toLowerCase())
                              )
                              .filter(
                                (item) =>
                                  !search.category ||
                                  item.categoryId === search.category
                              )}
                            number={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="list-achievements"
                      role="tabpanel"
                      aria-labelledby="list-achievements-list"
                    >
                      <div className="row justify-content-center">
                        <div className="col-12 mb-2 text-center">
                          <h3>マイコース</h3>
                        </div>
                        <div className="col-10 d-flex justify-content-end">
                          <Form.Control
                            placeholder="キーワード検索"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                handleSearch();
                              }
                            }}
                            style={{ width: "268px" }}
                          />

                          <Form.Select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            style={{ width: "200px", marginLeft: "23px" }}
                          >
                            <option value="">全てのカテゴリー</option>
                            {data.categories.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Select>

                          <Button
                            variant="primary"
                            onClick={() => {
                              handleSearch();
                            }}
                            style={{ width: "50px", marginLeft: "20px" }}
                          >
                            <i className="fa fa-search"></i>
                          </Button>
                        </div>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <div className="mt-3">
                          <CoursesSection
                            categories={data.categories}
                            courses={data.user.courseOfUser
                              .filter(
                                (item) =>
                                  !search.name ||
                                  item.name
                                    .toLowerCase()
                                    .includes(search.name.toLowerCase())
                              )
                              .filter(
                                (item) =>
                                  !search.category ||
                                  item.categoryId === search.category
                              )
                              .filter(
                                (item) => typeof item.achievement === "number"
                              )}
                            number={2}
                            showAchievements={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        //       <div className="user-profile mt-5">
        // <div className="row">
        //   <div className="col-4">
        //     <div className="left-information"></div>
        //   </div>
        //   <div className="col-8"></div>
        // </div>
      )}
    </>
  );
}
