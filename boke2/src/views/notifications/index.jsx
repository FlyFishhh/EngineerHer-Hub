import { NotificationsWrapper } from "./style";
import { Tabs, Button, Avatar, Divider } from "antd";
import SectionPosts from "@/components/section-post";
import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notice } from "@/services/modules/home";
const Notifications = memo(() => {
  const [dataInfo, setDataInfo] = useState([]);
  const getInfo = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("userInfo")).id;
      const res = await notice({ id: id });
      if (res.code === 200) {
        let datalist = [
          {
            name: "Likes",
            num: res.data.likes,
            list: res.data.likeList,
          },
          {
            name: "Bookmarks",
            num: res.data.collections,
            list: res.data.collectionList,
          },
          {
            name: "New Followers",
            num: res.data.fans,
            list: res.data.fanList,
          },
          {
            name: "Comments",
            num: res.data.comments,
            list: res.data.commentList,
          },
        ];
        setDataInfo(datalist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <NotificationsWrapper>
      <div className="content">
        <div style={{ marginTop: 30 }}>
          <Tabs
            defaultActiveKey="2"
            items={dataInfo.map((item, i) => {
              const id = String(i + 1);

              return {
                label: (
                  <span>
                    {item.name}
                    <span className="dot">{item.num}</span>
                  </span>
                ),
                key: id,
                children: item.list.map((item2) => {
                  return (
                    <div className="item">
                      <div className="avatar">
                        <Link to={`/profile/` + item2.userId}>
                          {" "}
                          <Avatar size={55} src={item2.imgUrl} />
                        </Link>
                      </div>
                      {item2.name === "New Followers" ? (
                        <Link to={`/profile/` + item2.userId}>
                          <div className="contentbox">
                            <div className="top">
                              <div className="name">{item2.name}</div>
                              <div className="time">{item2.createTime}</div>
                            </div>
                            <div>{item2.content.substring(0, 30)}</div>
                          </div>
                        </Link>
                      ) : (
                        <Link to={`/detail/` + item2.postId}>
                          <div className="contentbox">
                            <div className="top">
                              <div className="name">{item2.name}</div>
                              <div className="time">{item2.createTime}</div>
                            </div>
                            <div>{item2.content.substring(0, 30)}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                }),
              };
            })}
          />
        </div>
      </div>
    </NotificationsWrapper>
  );
});

export default Notifications;
