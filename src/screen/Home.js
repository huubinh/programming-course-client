import React, { useEffect } from "react";
import CoursesSection from "../components/course/Courses";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getHomeList } from "../redux/actions/homeActions";
import LoadingPage from "../components/Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const homeList = useSelector((state) => state.homeList);
  const { list, loading } = homeList;

  useEffect(() => {
    dispatch(getHomeList());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingPage />}
      {list && (
        <>
          <div id="home" className="container" style={{ marginTop: "100px" }}>
            <div className="search-form">
              <form className="d-flex">
                <div className="wrap">
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="検索"
                    />
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div id="main" style={{ marginTop: "30px", marginBottom: "120px" }}>
              <div className="mt-3">
                <CoursesSection title="コース一覧" courses={list.courses} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
