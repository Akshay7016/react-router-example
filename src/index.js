import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom"


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  , document.getElementById('root')
);

function Home() {
  return (
    <div>
      <h1>Home route</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>

      <Link className='btn btn-success' to="/learn/courses">Courses</Link> &nbsp;
      <Link className='btn btn-primary' to="/learn/bundles">Bundles</Link>

      <Outlet />
    </div>
  )
}

function Courses() {

  const courseList = ["React", "Angular", "Vue", "NodeJS"];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)]

  return (
    <div className='mt-4'>
      <h1>Courses list</h1>
      <h4>Courses card</h4>

      <p>More text</p>
      {/* For <NavLink > we can give style */}
      <NavLink className="font-weight-bold mr-4" to={`/learn/courses/${randomCourseName}`}>
        {randomCourseName}
      </NavLink>

      <NavLink className="btn btn-danger" to={"/learn/courses/tests"}>
        Test
      </NavLink>

      <Outlet />
    </div>
  )
}

function Bundles() {
  return (
    <div className='mt-4'>
      <h1>Bundles list</h1>
      <h4>Bundles card</h4>
    </div>
  )
}

function CourseId() {
  // useParams() is used to store parameter that is passed in url
  const { courseid } = useParams();

  // useNavigate() is used to naviagte to another page but it can also take "state" with it. We can use <Link> also. useNavigate() is used for reference/example only
  const navigate = useNavigate();

  return (
    <div>
      <h1>URL Params is : {courseid}</h1>

      <button className='btn btn-success mt-4'
        onClick={() => {
          navigate("/dashboard", { state: courseid })
        }}>
        Price
      </button>

      {/* rather than  "navigate" we can also use <Link> */}
      <Link className="btn btn-primary mt-4 ml-4" to="/dashboard" state={"DJANGO"}>
        Test Link
      </Link>
    </div>
  )
}

function Dashboard() {
  // uselocation is used to take "state" that is passed through "navigate"
  const location = useLocation();
  return (
    <div>
      <h1>Info that I got here is {location.state} </h1>
    </div>
  )
}