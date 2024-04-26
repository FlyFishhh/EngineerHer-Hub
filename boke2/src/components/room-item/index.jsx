import PropTypes from "prop-types";
import React, {
  memo,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ItemWrapper } from "./style";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  MessageFilled,
  TagOutlined,
  TagFilled,
  StarOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Image,
  Comment,
  Tooltip,
  List,
  Divider,
  Space,
  message,
} from "antd";
import { collectionAndlike } from "@/services/modules/home";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "@/SearchContext";
const RoomItem = memo((props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm, handleSearchTermChange, handleProfile } =
    useContext(SearchContext);

  const { itemData, itemWidth = "25%" } = props;
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const handlelike = async (value) => {
    if (localStorage.getItem("token")) {
      try {
        let param = {
          id: value.postId,
          type: "like",
        };
        const res = await collectionAndlike(param);
        if (res.code === 200) {
          message.success("successful!");
          if (location.pathname === "/home") {
            handleSearchTermChange("");
            navigate("/home", { state: { value: "" } });
          } else if (location.pathname === "/profile") {
            handleProfile("");
            navigate("/profile/", { state: { value: "" } });
          } else {
            handleProfile("");
            navigate("/profile/" + value.userId, { state: { value: "" } });
          }
        }
      } catch (error) {}
    } else {
      message.warning("Please log in first");
    }
  };
  const handlecollect = async (value) => {
    if (localStorage.getItem("token")) {
      try {
        let param = {
          id: value.postId,
          type: "collection",
        };
        const res = await collectionAndlike(param);
        if (res.code === 200) {
          message.success("successful!");
          if (location.pathname === "/home") {
            handleSearchTermChange("");
            navigate("/home", { state: { value: "" } });
          } else if (location.pathname === "/profile") {
            handleProfile("");
            navigate("/profile/", { state: { value: "" } });
          } else {
            handleProfile("");
            navigate("/profile/" + value.userId, { state: { value: "" } });
          }
        }
      } catch (error) {}
    } else {
      message.warning("Please log in first");
    }
  };

  const goDetail = (id) => {
    if (localStorage.getItem("token")) {
      navigate(`/detail/${id}`);
    } else {
      message.warning("Please log in first");
    }
  };

  const goUserInfo = (userId) => {
    if (localStorage.getItem("token")) {
      navigate(`/profile/${userId}`);
    } else {
      message.warning("Please log in first");
    }
  };

  return (
    <ItemWrapper
      verifyColor={itemData?.verify_info?.text_color || "#39576a"}
      itemWidth={itemWidth}
    >
      <div className="inner">
        <div style={{ width: "100%" }}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={itemData}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <div onClick={() => handlelike(item)}>
                    <IconText
                      icon={item.likeFlag === "1" ? HeartFilled : HeartOutlined}
                      text={item.likes}
                      key="list-vertical-star-o"
                    />
                  </div>,
                  <IconText
                    icon={MessageOutlined}
                    text={item.comments}
                    key="list-vertical-like-o"
                  />,
                  <div onClick={() => handlecollect(item)}>
                    <IconText
                      icon={
                        item.collectionFlag === "1" ? TagFilled : TagOutlined
                      }
                      text={item.collections}
                      key="list-vertical-message"
                    />{" "}
                  </div>,
                ]}
                // extra={
                //   <div style={{ width: "450px" }}>
                //     {item.images > 0 &&
                //       item.images.map((item2, index) => {
                //         return (
                //           <Image
                //             key={index}
                //             width={150}
                //             height={150}
                //             src={item2}
                //             preview={item2}
                //           />
                //         );
                //       })}
                //   </div>
                // }
              >
                <List.Item.Meta
                  // onClick={() => goDetail(item.postId)}
                  avatar={
                    // <Link to={`/profile/` + item.userId}>
                    // {" "}
                    <Avatar
                      onClick={() => goUserInfo(item.userId)}
                      size={58}
                      src={item.imgUrl}
                    />
                    // </Link>
                  }
                  title={item.name}
                  description={item.createTime}
                />
                <div>
                  <div onClick={() => goDetail(item.postId)}>
                    {" "}
                    {item.content}
                  </div>
                  <div style={{ width: "450px",marginTop:'20px' }}>
                    {item.images.map((item2, index) => {
                      return (
                        <Image
                          key={index}
                          width={150}
                          height={150}
                          src={item2}
                          preview={item2}
                        />
                      );
                    })}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Divider />
    </ItemWrapper>
  );
});

RoomItem.propTypes = {
  itemData: PropTypes.array,
};

export default RoomItem;
