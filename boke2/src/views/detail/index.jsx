import { DetailWrapper } from "./style";
import {
  Button,
  Avatar,
  Image,
  Comment,
  Divider,
  Form,
  Input,
  List,
  message,
} from "antd";
import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, comment } from "@/services/modules/home";
const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} maxLength={300} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentList = ({ comments }) => (
  <List
    locale={{ emptyText: "No comments" }}
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Detail = memo(() => {
  const { id } = useParams();
  const [dataInfo, setDataInfo] = useState([]);
  const getInfo = async () => {
    try {
      if (id) {
        const res = await getPost(id);
        if (res.code === 200) {
          let temp = res.data;
          let templist = res.data.commentList.map((item) => {
            return {
              author: item.name,
              avatar: item.imgUrl,
              content: item.content,
              datetime: item.createTime,
            };
          });
          temp.commentList = templist;
          setDataInfo(temp);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) return;
    setSubmitting(true);
    let param = {
      postId: id,
      content: value,
    };
    const res = await comment(param);
    if(res.code === 200){
      message.success("successful!");
      setSubmitting(false);
      setValue("");
      getInfo();
    }else{
      message.error(res.message);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <DetailWrapper>
      <div className="content">
        <div className="mainbox">
          <div className="topinfo">
            <div className="avatar">
              <Avatar size={55}>USER</Avatar>
            </div>
            <div className="contentbox">
              <div className="top">
                <div className="name">{dataInfo.name}</div>
              </div>
              <div>{dataInfo.createTime}</div>
            </div>
          </div>
          <div className="detail">
            <div className="content">{dataInfo.content}</div>
            <div className="imgbox">
              {dataInfo.images &&
                dataInfo.images.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      width={280}
                      height={280}
                      src={item}
                      preview={item}
                    />
                  );
                })}
            </div>
            <Divider>comment</Divider>
            <div className="comment">
              <>
                {dataInfo.commentList && (
                  <CommentList comments={dataInfo.commentList} />
                )}
                <Comment
                  avatar={<Avatar alt="Han Solo">User</Avatar>}
                  content={
                    <Editor
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />
              </>
            </div>
          </div>
        </div>
      </div>
    </DetailWrapper>
  );
});

export default Detail;
