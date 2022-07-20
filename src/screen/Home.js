import React, { useState, useEffect } from "react";
import CoursesSection from "../components/course/Courses";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getHomeList } from "../redux/actions/homeActions";
import LoadingPage from "../components/Loading/Loading";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
export default function Home() {
  const dispatch = useDispatch();
  const homeList = useSelector((state) => state.homeList);
  const { list, loading } = homeList;

  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    dispatch(getHomeList());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <LoadingPage />}
      {list && (
        <>
          <div id="home" className="container" style={{ marginTop: "110px" }}>
            <div className="row">
              <div className="col-4 mt-1">
                <h3>コース一覧</h3>
              </div>
              <div className="col-8 d-flex justify-content-end">
                <Form.Control
                  placeholder="キーワード検索"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      dispatch(
                        getHomeList({
                          name: searchName,
                          category: searchCategory,
                        })
                      );
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
                  {list.categories.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>

                <Button
                  variant="primary"
                  onClick={() => {
                    dispatch(
                      getHomeList({
                        name: searchName,
                        category: searchCategory,
                      })
                    );
                  }}
                  style={{ width: "50px", marginLeft: "20px" }}
                >
                  <i className="fa fa-search"></i>
                </Button>
              </div>
            </div>
            <div id="main" style={{ marginTop: "30px" }}>
              <div className="mt-3">
                <CoursesSection
                  categories={list.categories}
                  courses={list.courses}
                  number={4}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {list && list.courses.length === 0 && (
        <>
          <img
            src="/search.png"
            alt="search-not-found"
            style={{ marginTop: "-10px", width: "40%", marginLeft: "30%" }}
          />
          <h5 style={{ textAlign: "center" }}>
            あなたがお探しのキーワードに一致する情報は見つかりませんでした。
          </h5>
        </>
      )}
    </>
  );
}
