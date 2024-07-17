import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Lists from "./Lists";
import Tables from "./Tables";
import Images from "./Images";
import Forms from "./Forms";
import Anchors from "./Anchors";

export default function Lab1() {
  return (
    <div id="wd-labs" className="container-fluid">
      <h2>Lab 1</h2>
      <div id="wd-github">
        <a href="https://github.com/daisydbbb/kanbas-react-web-app/tree/a1">
          GitHub
        </a>
      </div>
      <h3>HTML Examples</h3>
      <Headings />
      <Paragraphs />
      <Lists />
      <Tables />
      <Images />
      <Forms />
      <Anchors />
    </div>
  );
}
