export default function QuizProperty({ quiz }: { quiz: any }) {
  return (
    <div className="row">
      <div className="col-sm-4 d-flex justify-content-end">
        <b>Quiz Type</b>
      </div>
      <div className="col-sm-8">
        {quiz.type === undefined ? "Graded Quiz" : quiz.type}
      </div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Points</b>
      </div>
      <div className="col-sm-8">{quiz.points}</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Shuffle Answers</b>
      </div>
      <div className="col-sm-8">No</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Time Limit</b>
      </div>
      <div className="col-sm-8">30 Minutes</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Multiple Attempts</b>
      </div>
      <div className="col-sm-8">No</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>View Response</b>
      </div>
      <div className="col-sm-8">Always</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Show Correct Answers</b>
      </div>
      <div className="col-sm-8">Immediately</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>One Question at a Time</b>
      </div>
      <div className="col-sm-8">Yes</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Require Respondus LockDown Browser</b>
      </div>
      <div className="col-sm-8">No</div>

      <div className="col-sm-4 d-flex justify-content-end">
        <b>Required to View Quiz Results</b>
      </div>
      <div className="col-sm-8">No</div>
    </div>
  );
}
