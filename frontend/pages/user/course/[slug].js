import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Menu, Avatar, Button, Card, Upload, message } from "antd";
import { Context } from "../../../context";
import { PlayCircleOutlined, CheckCircleFilled, MinusCircleFilled } from "@ant-design/icons";

const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [updateState, setUpdateState] = useState(false);
  const { state: { user } } = useContext(Context);
  const router = useRouter();
  const { slug } = router.query; 

  const { name, description, instructor, updatedAt, lessons, image, price, paid, category, program } = course;

  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/course/${slug}`);
      setCourse(data);
      setLoading(false);
    } catch (error) {
      // Handle error
      setLoading(false);
      console.error(error);
    }
  };

  const handleFileUpload = (file) => {
    // Handle file upload logic here
    console.log("Uploading file: ", file);
    // You can make an API request to upload the file to the server
  };

  return (
    <StudentRoute>
      <div className="dashboard-container">
        <h1 className="course-title">{course && name}</h1>
        <p className="course-description">Description: {course && description}</p>
        <div className="instructor-info">
          <p className="instructor-name">{instructor && instructor.name}</p>
          <p className="instructor-location">{instructor && instructor.location}</p>
        </div>
        
        <Card title="Upload Files" className="upload-card">
          <Upload
            customRequest={handleFileUpload}
            showUploadList={false}
            beforeUpload={() => {
              // You can add validation logic here
              return true;
            }}
          >
            <Button type="primary" icon={<PlayCircleOutlined />}> 
              Upload File
            </Button>
          </Upload>
        </Card>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
