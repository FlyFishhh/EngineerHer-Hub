import IconAvatar from "@/assets/svg/icon_avatar";
import {
  MessageOutlined,
  IdcardOutlined,
  PlusOutlined,
  BellOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import IconMenu from "@/assets/svg/icon_menu";
import React, { memo, useEffect, useState } from "react";
import { RightWrapper } from "./style";
import { Link, useNavigate } from "react-router-dom";
const HeaderRight = memo(() => {
  const navigate = useNavigate();
  /** 定义组件内部的状态 */
  const [showPanel, setShowPanel] = useState(false);

  /** 副作用代码 */
  useEffect(() => {
    function windowHandleClick() {
      setShowPanel(false);
    }
    window.addEventListener("click", windowHandleClick, true);
    return () => {
      window.removeEventListener("click", windowHandleClick, true);
    };
  }, []);

  /** 事件处理函数 */
  function profileClickHandle() {
    setShowPanel(true);
  }

  function handleClick() {
    console.log("hhh");
    localStorage.clear();
  }

  return (
    <RightWrapper>
      {!localStorage.getItem("token") ? (
        <div className="btns">
          <span className="btn">
            <Link to="/login">Log in</Link>
          </span>
          <span className="btn">
            <Link to="/register">Register</Link>
          </span>
        </div>
      ) : (
        <div className="btns">
          <span className="email">
            {JSON.parse(localStorage.getItem("userInfo")).email}
          </span>
        </div>
      )}
      {localStorage.getItem("token") && (
        <div className="profile" onClick={profileClickHandle}>
          <IconMenu />
          <IconAvatar />

          {showPanel && (
            <div className="panel">
              <div className="top">
                <Link to="/profile">
                  <div className="item">
                    <IdcardOutlined />
                    &nbsp; Profile
                  </div>
                </Link>
                <Link to="/addpost">
                  <div className="item">
                    <PlusOutlined />
                    &nbsp; Add Post
                  </div>
                </Link>
                <Link to="/notifications">
                  <div className="item">
                    <BellOutlined />
                    &nbsp; Notifications
                  </div>
                </Link>
                <Link to="/messages">
                  <div className="item">
                    <MessageOutlined />
                    &nbsp; Messages
                  </div>
                </Link>
              </div>
              <div className="bottom">
                <Link to="/login">
                  <div className="item login">
                    <ImportOutlined />
                    &nbsp; Log out
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </RightWrapper>
  );
});

export default HeaderRight;
