import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserProfile from "../../components/user/userprofile/UserProfile";
import "./user.scss";

export default function UserProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div>
      {userInfo && (
        // <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
        //   <div className="bg-dashboash-user">
        //     <div className="container">
        //       <Nav className="tab-panel-button">
        //         <Nav.Item className="button-tab-panel">
        //           <Nav.Link eventKey="profile">
        //             <i className="fas fa-user"></i>プロフィール
        //           </Nav.Link>
        //         </Nav.Item>
        //       </Nav>
        //     </div>
        //   </div>
        //   <div className="content-main-user">
        //     <div className="container">
        //       <div className="wrapper">
        //         <Tab.Content>
        //           <Tab.Pane eventKey="profile">
        <UserProfile token={userInfo.tokens} />
        //           </Tab.Pane>
        //         </Tab.Content>
        //       </div>
        //     </div>
        //   </div>
        // </Tab.Container>
      )}
    </div>
  );
}
