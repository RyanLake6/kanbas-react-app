import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { FaCaretRight, FaGlasses } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
function Courses() {
  const { courseId } = useParams();
  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>
          <span className="wd-kanbas-courses-navigation">
            <HiMiniBars3 /> Course <FaCaretRight className="ms-2" />
          </span>
          {course?.name}
        </h2>
        <span style={{ marginLeft: "auto" }}>
          <button>
            <FaGlasses className="wd-fg-color-white" size={32} />
            Student View
          </button>
        </span>
      </div>

      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "70px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
