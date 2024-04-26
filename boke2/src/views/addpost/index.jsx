import { AddpostWrapper } from "./style";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";
import { Input, Select, Button, Upload, Modal, Tabs,message } from "antd";
import React, { memo, useEffect, useContext, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addpost } from "@/services/modules/home";
import { SearchContext } from "@/SearchContext";
const Addpost = memo(() => {
  const navigate = useNavigate();
  const { handleSearchTermChange } = useContext(SearchContext);
  const { TextArea } = Input;
  const tabNames = [
    {
      value: "Electrical Engineering",
      label: "Electrical Engineering",
    },
    {
      value: "Mechanical Engineering",
      label: "Mechanical Engineering",
    },
    {
      value: "Computer Engineering",
      label: "Computer Engineering",
    },
    {
      value: "Aerospace Engineering",
      label: "Aerospace Engineering",
    },
    {
      value: "Chemical Engineering",
      label: "Chemical Engineering",
    },
    {
      value: "Civil Engineering",
      label: "Civil Engineering",
    },
    {
      value: "Environmental Engineering",
      label: "Environmental Engineering",
    },
    {
      value: "Biomedical Engineering",
      label: "Biomedical Engineering",
    },
    {
      value: "Industrial Engineering",
      label: "Industrial Engineering",
    },
    {
      value: "Materials Engineering",
      label: "Materials Engineering",
    },
    {
      value: "Nuclear Engineering",
      label: "Nuclear Engineering",
    },
    {
      value: "Petroleum Engineering",
      label: "Petroleum Engineering",
    },
    {
      value: "Ocean Engineering",
      label: "Ocean Engineering",
    },
    {
      value: "Systems Engineering",
      label: "Systems Engineering",
    },
    {
      value: "Biotechnology Engineering",
      label: "Biotechnology Engineering",
    },
  ];

  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const contentOnChange = (e) => {
    setContent(e.target.value);
  };
  const typeOnChange = (value) => {
    setType(value);
  };
  const submitpost = async () => {
    try {
      const imgUrl = fileList.map((item) => {
        return item.response.data;
      });
      let param = {
        content: content,
        type: type,
        imgUrl: imgUrl.join(","),
      };
      const res = await addpost(param);
      if (res.code === 200) {
        message.success("successful!");
        handleSearchTermChange("");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <div>
      <PictureOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Add Pictures
      </div>
    </div>
  );
  return (
    <AddpostWrapper>
      <div className="content">
        <div className="postarea">
          <TextArea
            showCount
            maxLength={1000}
            style={{ height: 280, resize: "none" }}
            placeholder="Add Text"
            value={content}
            onChange={contentOnChange}
          />
          <Select
            placeholder="choose a tipic"
            style={{ width: 230, marginTop: 15 }}
            options={tabNames}
            allowClear
            value={type}
            onChange={typeOnChange}
          />
          <div style={{ marginTop: 15 }}>
            <Upload
              action="http://agbgxw.natappfree.cc/user/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUploadChange}
              maxCount={9}
            >
              {fileList.length >= 9 ? null : uploadButton}
            </Upload>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button style={{ width: 200 }} type="primary" onClick={submitpost}>
              Post
            </Button>
          </div>

          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </div>
    </AddpostWrapper>
  );
});

export default Addpost;
