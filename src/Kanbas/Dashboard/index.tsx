export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} alt="reactjs" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1234/Home"
            >
              CS1234 React JS
            </a>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <a href="#/Kanbas/Courses/1234/Home"> Go </a>
          </div>
        </div>
        <br></br>
        <div className="wd-dashboard-course">
          <img src="/images/html.jpg" width={200} alt="html" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1101/Home"
            >
              CS1101 Introduction to HTML
            </a>
            <p className="wd-dashboard-course-title">
              Learn the foundational languages of web development
            </p>
            <a href="#/Kanbas/Courses/1101/Home"> Go </a>
          </div>
        </div>
        <br></br>
        <div className="wd-dashboard-course">
          <img src="/images/css.jpg" width={200} alt="css" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1102/Home"
            >
              CS1102 Introduction to CSS
            </a>
            <p className="wd-dashboard-course-title">
              Building and styling web pages
            </p>
            <a href="#/Kanbas/Courses/1102/Home"> Go </a>
          </div>
        </div>
        <br></br>
        <div className="wd-dashboard-course">
          <img src="/images/javascript.jpg" width={200} alt="javascript" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1123/Home"
            >
              CS1123 JavaScript Fundamentals
            </a>
            <p className="wd-dashboard-course-title">
              Explore the basics of JavaScript
            </p>
            <a href="#/Kanbas/Courses/1123/Home"> Go </a>
          </div>
        </div>
        <br></br>

        <div className="wd-dashboard-course">
          <img src="/images/webdev.jpg" width={200} alt="webdev" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/2204/Home"
            >
              CS2204 Full Stack Web Development
            </a>
            <p className="wd-dashboard-course-title">
              Gain skills in both frontend and backend development
            </p>
            <a href="#/Kanbas/Courses/2204/Home"> Go </a>
          </div>
        </div>
        <br></br>

        <div className="wd-dashboard-course">
          <img src="/images/mobile.jpg" width={200} alt="mobile" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/3046/Home"
            >
              CS3046 Mobile App Development
            </a>
            <p className="wd-dashboard-course-title">
              Develope mobile-friendly websites and web applications
            </p>
            <a href="#/Kanbas/Courses/3046/Home"> Go </a>
          </div>
        </div>
        <br></br>

        <div className="wd-dashboard-course">
          <img src="/images/devops.jpg" width={200} alt="devops" />
          <div>
            <a
              className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/4088/Home"
            >
              CS4088 DevOps for Web Developers
            </a>
            <p className="wd-dashboard-course-title">
              Gain insights into DevOps practices and tools for web development
            </p>
            <a href="#/Kanbas/Courses/4088/Home"> Go </a>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
}
