export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4 mt-0">
          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/1234/Home"
              >
                <img
                  src="/images/reactjs.jpg"
                  width="100%"
                  height="140px"
                  alt="reactjs"
                />
                <div className="card-body">
                  <h5 id="wd-dashboard-course-title" className="card-title">
                    CS1234 React JS
                  </h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/1101/Home"
              >
                <img
                  src="/images/html.jpg"
                  width="100%"
                  height="140px"
                  alt="html"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1101 HTML
                  </h5>
                  <p className="card-text">
                    Foundational languages of web development
                  </p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/1102/Home"
              >
                <img
                  src="/images/css.jpg"
                  width="100%"
                  height="140px"
                  alt="css"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1102 CSS
                  </h5>
                  <p className="card-text">Building and styling web pages</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                className="wd-dashboard-course-link text-decoration-none text-dark"
                href="#/Kanbas/Courses/1101/Home"
              >
                <img
                  src="/images/javascript.jpg"
                  width="100%"
                  height="140px"
                  alt="javascript"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1123 JavaScript
                  </h5>
                  <p className="card-text">Explore the basics of JavaScript</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/2204/Home"
              >
                <img
                  src="/images/webdev.jpg"
                  width="100%"
                  height="140px"
                  alt="webdev"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS2204 Full Stack Web Development
                  </h5>
                  <p className="card-text">Frontend and backend dev</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/2301/Home"
              >
                <img
                  src="/images/database.jpg"
                  width="100%"
                  height="140px"
                  alt="database"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS2301 Database Management
                  </h5>
                  <p className="card-text">Build and manage database</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/3046/Home"
              >
                <img
                  src="/images/mobile.jpg"
                  width="100%"
                  height="140px"
                  alt="mobile"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS3046 Mobile App Development
                  </h5>
                  <p className="card-text">Develope mobile applications</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div
            id="wd-dashboard-course"
            className="col"
            style={{ width: "270px" }}
          >
            <div className="card fixed-size-card">
              <a
                id="wd-dashboard-course-link"
                className="text-decoration-none text-dark"
                href="#/Kanbas/Courses/4088/Home"
              >
                <img
                  src="/images/devops.jpg"
                  width="100%"
                  height="140px"
                  alt="devops"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS4088 DevOps for Web Developers
                  </h5>
                  <p className="card-text">DevOps practices and tools</p>
                  <button
                    className="btn btn-primary position-absolute"
                    style={{ bottom: "10px", left: "10px" }}
                  >
                    Go
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
