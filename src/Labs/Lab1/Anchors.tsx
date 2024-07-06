export default function Anchors() {
  return (
    <div>
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
