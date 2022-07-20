import React from "react";
import { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ChangeRouter from "./components/changeRouter";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: "fit-content" }}
        />
        <Provider store={store}>
          <BrowserRouter>
            <ChangeRouter />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
// const mapStateToProps = (state, ownProps) => {
//   return {};
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     initMenu: (menus) => {
//       dispatch(initMenu(menus));
//     },
//     initCourses: (courses) => {
//       dispatch(initCourses(courses));
//     },
//   };
// };
//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
