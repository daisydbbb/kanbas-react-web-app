import ImportExportSettingIcons from "./ImportExportSettingIcons";
import SearchBars from "./SearchBars";
import GradeTable from "./GradeTable";

export default function Grades() {
  return (
    <div id="wd-grades" className="row">
      <div className="col-12 mb-2">
        <ImportExportSettingIcons />
      </div>
      <div className="col-12 mb-2">
        <SearchBars />
      </div>
      <div id="wd-grade-table" className="col-12 mb-2">
        <GradeTable />
      </div>
    </div>
  );
}
