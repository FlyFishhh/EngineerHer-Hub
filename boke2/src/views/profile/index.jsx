import { ProfileWrapper } from "./style";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";
import {
  Button,
  Avatar,
  Divider,
  Tabs,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import SectionPosts from "@/components/section-post";
import React, { memo, useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { findUserById, updateUserById, focus } from "@/services/modules/home";

import { SearchContext } from "@/SearchContext";

const Profile = memo(() => {
  const { handleProfile } = useContext(SearchContext);
  const { TextArea } = Input;
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const { id } = useParams();

  const [form] = Form.useForm();
  const onFinish = async (value) => {
    console.log(value);
    let param = {
      id: JSON.parse(localStorage.getItem("userInfo")).id,
    }
    if(value.name){
      param.name = value.name;
    }
    if(value.password){
      param.password = value.password;
    }
    if(value.remark){
      param.remark = value.remark;
    }
    if(value.imgUrl){
      const imgUrllist = value.imgUrl.fileList.map((item) => {
        return item.response.data;
      });
      param.imgUrl = imgUrllist;
    }
    const res = await updateUserById(param);
    if (res.code === 200) {
      message.success("successful!");
      setIsModalOpen(false);
      getUserInfo();
    }
  };

  const [tabList, setTabList] = useState([]);

  const getUserInfo = async () => {
    try {
      if (id) {
        const res = await findUserById(id);
        if (res.code === 200) {
          setUserInfo(res.data);
          let temp = [
            {
              label: "Posts",
              key: 1,
              children: (
                <SectionPosts roomList={res.data.postList} itemWidth="100%" />
              ),
            },
            {
              label: "Bookmarks",
              key: 2,
              children: (
                <SectionPosts
                  roomList={res.data.collectionList}
                  itemWidth="100%"
                />
              ),
            },
          ];
          setTabList(temp);
        }
      } else {
        let id = JSON.parse(localStorage.getItem("userInfo")).id;
        const res = await findUserById(id);
        if (res.code === 200) {
          setUserInfo(res.data);
          let temp = [
            {
              label: "Posts",
              key: 1,
              children: (
                <SectionPosts roomList={res.data.postList} itemWidth="100%" />
              ),
            },
            {
              label: "Bookmarks",
              key: 2,
              children: (
                <SectionPosts
                  roomList={res.data.collectionList}
                  itemWidth="100%"
                />
              ),
            },
          ];
          setTabList(temp);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async () => {
    try {
      if (id) {
        const res = await focus({ id: id });
        if (res.code === 200) {
          message.success("successful");
          getUserInfo();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showPanel, setShowPanel] = useState(false);
  const [showFans, setShowFans] = useState(false);

  function profileClickHandle() {
    setShowPanel(true);
  }
  function fansClickHandle() {
    setShowFans(true);
  }

  useEffect(() => {
    getUserInfo();
    function windowHandleClick() {
      setShowPanel(false);
      setShowFans(false);
    }
    window.addEventListener("click", windowHandleClick, true);
    return () => {
      window.removeEventListener("click", windowHandleClick, true);
    };
  }, [id, handleProfile]);

  return (
    <ProfileWrapper>
      <div className="content">
        <div className="userInfo">
          <div>
            {" "}
            <Avatar size={100} src={userInfo.imgUrl}></Avatar>
          </div>
          <div className="rightinfo">
            <div className="name">{userInfo.name}</div>
            <div className="count">
              <div className="Following">
                <div className="numbox">
                  <span onClick={profileClickHandle}>{userInfo.focusNum}</span>
                  {showPanel && (
                    <div className="panel">
                      <div className="top">
                        {userInfo.focusList.map((item) => {
                          return (
                            <Link key={item.id} to={`/profile/` + item.id}>
                              <div className="item">
                                <div>
                                  <Avatar size={28}>User</Avatar>
                                </div>
                                <div>{item.name}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div>Following</div>
              </div>
              <div className="Following">
                <div className="numbox">
                  <span onClick={fansClickHandle}>{userInfo.fansNum}</span>
                  {showFans && (
                    <div className="panel">
                      <div className="top">
                        {userInfo.fansList.map((item) => {
                          return (
                            <Link to={`/profile/` + item.id}>
                              <div className="item">
                                <div>
                                  <Avatar size={28}>User</Avatar>
                                </div>
                                <div>{item.name}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div>Followers</div>
              </div>
            </div>
          </div>

          <div>
            {localStorage.getItem("token") == userInfo.id ? (
              <Button type="primary" onClick={showModal}>
                Edit Profile
              </Button>
            ) : (
              <div>
                <Button type="primary" onClick={follow}>
                  {userInfo.focusFlag ? "Unfollow" : "Follow"}
                </Button>
                <Link to={"/messagesDetail/" + id}>
                  <Button style={{ marginLeft: "15px" }} type="primary">
                    Send Message
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="desc">{userInfo.remark}</div>
        <Divider />

        <Tabs items={tabList} />

        <Modal
          title="Edit UserInfo"
          onCancel={handleClose}
          open={isModalOpen}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
          >
            <Form.Item label="Avatar" name="imgUrl">
              <Upload
                action="http://agbgxw.natappfree.cc/user/upload"
                listType="picture-card"
                maxCount={1}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="UserName" name="name">
              <Input placeholder="Your UserName" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item label="" name="remark">
              <TextArea rows={4} placeholder="Your Personal signature" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ProfileWrapper>
  );
});

export default Profile;
