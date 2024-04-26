import { MessagesWrapper } from "./style";
import { Button, Avatar, Divider, Tabs } from "antd";
import SectionPosts from "@/components/section-post";
import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMessageList } from "@/services/modules/home";
const Messages = memo(() => {
  const [dataInfo, setDataInfo] = useState([]);
  const getInfo = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("userInfo")).id;
      const res = await getMessageList({ id: id });
      if (res.code === 200) {
        setDataInfo(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <MessagesWrapper>
      <div className="content">
        {dataInfo.map((item, index) => {
          return (
            <div className="item" key={index}>
              <>
                <Link key={index} to={"/profile/" + item.userId}>
                  <div className="avatar">
                    <Avatar size={55}>USER</Avatar>
                  </div>
                </Link>
                <Link key={index} to={"/messagesDetail/" + item.userId}>
                  <div className="contentbox">
                    <div className="top">
                      <div className="name">{item.name}</div>
                      <div className="time">{item.createTime}</div>
                    </div>
                    <div>{item.message}</div>
                  </div>
                </Link>
              </>
            </div>
          );
        })}
      </div>
    </MessagesWrapper>
  );
});

export default Messages;
