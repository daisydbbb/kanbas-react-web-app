import ImportExportSettingIcons from "./ImportExportSettingIcons";
import SearchBars from "./SearchBars";
import GradeTable from "./GradeTable";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Grades() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((a) => a.course === cid);
  const enrollments = db.enrollments.filter((e) => e.course === cid);
  const grades = db.grades;

  // generate the matrix for grade mapping
  const gradeMatrix = enrollments.map((e) => {
    const studentGrades: { [key: string]: string } = {};
    assignments.forEach((a) => {
      const grade = grades.find(
        (g) => g.student === e.user && g.assignment === a._id
      );
      studentGrades[a._id] = grade ? grade.grade : "";
    });
    return {
      student: e.user,
      grades: studentGrades, //{A102: '92'}
    };
  });
  console.log("HERE", gradeMatrix);

  return (
    <div id="wd-grades" className="row">
      <ImportExportSettingIcons />
      <SearchBars />
      <div id="wd-grade-table" className="table-responsive">
        <table className="table table-striped table-bordered table-hover ">
          <thead className="table-secondary ">
            <tr>
              <th scope="col">Student Name</th>
              {assignments
                .filter((a) => a.course === cid)
                .map((a) => (
                  <th
                    scope="col"
                    className="text-center"
                    style={{ fontWeight: "normal" }}
                    key={`${a._id}`}
                  >
                    ({a._id}) {a.title}
                    <br />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "normal",
                      }}
                    >
                      Out of {a.points}
                    </span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {gradeMatrix.map((row) => (
              <tr key={row.student}>
                <th scope="row" style={{ color: "red", fontWeight: "normal" }}>
                  {row.student}
                </th>
                {assignments.map((a) => (
                  <td className="text-center" key={`${row.student}-${a._id}`}>
                    <input
                      type="text"
                      defaultValue={row.grades[a._id]}
                      className="form-control d-inline-block input-no-bgd"
                      style={{ width: "80px" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
