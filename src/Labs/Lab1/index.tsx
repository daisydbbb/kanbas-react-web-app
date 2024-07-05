import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Lists from "./Lists";
import Tables from "./Tables";
import Images from "./Images";
import Forms from "./Forms";

export default function Lab1() {
  return (
    <div id="wd-labs">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <Headings />
      <Paragraphs />
      <Lists />
      <Tables />
      <Images />
      <Forms />
      <h4>Anchor tag</h4>
      <p>
        Please{" "}
        <a id="wd-lipsum" href="https://www.lipsum.com">
          click here
        </a>{" "}
        to get dummy text
        <br />
      </p>
      <p>
        Please{" "}
        <a
          id="wd-github"
          href="https://github.com/daisydbbb/kanbas-react-web-app/tree/lab1"
        >
          click here
        </a>{" "}
        to get code repository on GitHub
        <br />
      </p>
    </div>
  );
}
