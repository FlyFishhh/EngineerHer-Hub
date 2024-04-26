import { MessagesDetailWrapper } from "./style";
import {
  Button,
  Avatar,
  Image,
  Comment,
  Divider,
  Form,
  Input,
  List,
} from "antd";
import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMessage, sendMessage } from "@/services/modules/home";
const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} maxLength={1000} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Send Message
      </Button>
    </Form.Item>
  </>
);

const Detail = memo(() => {
  const { id } = useParams();
  const [dataInfo, setDataInfo] = useState([]);
  const getInfo = async () => {
    try {
      if (id) {
        const res = await getMessage(id);
        if (res.code === 200) {
          let temp = res.data.reverse();
          setDataInfo(temp);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    let data = {
      fromId: localStorage.getItem("token"),
      toId: id,
      message: value,
    };
    sendMessage(data).then((res) => {
      if (res.code === 200) {
        setSubmitting(false);
        setValue("");
        getInfo();
      }
    });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <MessagesDetailWrapper>
      <div className="content">
        <div className="mainbox">
          <div className="messagebox">
            {dataInfo.map((item, index) => {
              return item.userId == localStorage.getItem("token") ? (
                <div className="mine" key={index}>
                  <div className="box">
                    <div>
                      <Avatar alt="Han Solo">User</Avatar>
                    </div>
                    <div>
                      <div className="time">{item.name + ' ' +item.createTime}</div>
                      <div>{item.message}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="other" key={index}>
                  <div className="box">
                    <div>
                      <Avatar alt="Han Solo">User</Avatar>
                    </div>
                    <div>
                      <div className="time">{item.name + ' ' +item.createTime}</div>
                      <div>{item.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="comment">
            <>
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
    </MessagesDetailWrapper>
  );
});

export default Detail;
