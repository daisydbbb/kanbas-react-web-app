import ImportExportSettingIcons from "./ImportExportSettingIcons";
import SearchBars from "./SearchBars";
import GradeTable from "./GradeTable";

export default function Grades() {
  return (
    <div id="wd-grades" className="row">
      <ImportExportSettingIcons />
      <SearchBars />
      <div id="wd-grade-table" className="table-responsive">
        <GradeTable />
      </div>
    </div>
  );
}
