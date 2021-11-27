import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./style.module.css";

export function TestSample() {
  const [question, setQuestion] = useState({});
  const history = useHistory();
  const { state } = useLocation();
  const [ans, setAns] = useState("");
  const onHandleChangeAns = (e) => {
    let targetValue = e.target.value;
    setAns(targetValue);
  };

  const getSample = async () => {
    try {
      const res = await axios.get(
        "https://www.career.go.kr/inspct/openapi/test/questions?apikey=d419b256f1ead87608a0cd82a8dad3c4&q=6"
      );
      setQuestion({
        question: res.data.RESULT[0].question,
        answer01: res.data.RESULT[0].answer01,
        answer02: res.data.RESULT[0].answer02,
        answer03: res.data.RESULT[0].answer03,
        answer04: res.data.RESULT[0].answer04,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSample();
  }, []);
  return (
    <div>
      <h1 className={styles.sampleTitle}>검사예시</h1>
      <span className={styles.fakepercent}>0%</span>
      <div
        className="progress"
        style={{
          width: "90%",
          margin: "0 auto",
        }}
      >
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p className={styles.testDesc}>
        직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
        <br></br>
        가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
        <br></br>
      </p>
      <div className={styles.questionBox}>
        <p className={styles.question}>{question.question}</p>
        <div className={styles.switchField}>
          <input
            type="radio"
            id="radio-one"
            name="switch-one"
            value="ans01"
            checked={ans === "ans01"}
            onChange={onHandleChangeAns}
          />
          <label for="radio-one">
            {" "}
            <span>{question.answer01}</span>
            <br></br>
            {question.answer03}
          </label>
          <input
            type="radio"
            id="radio-two"
            name="switch-one"
            value="ans02"
            checked={ans === "ans02"}
            onChange={onHandleChangeAns}
          />
          <label for="radio-two">
            <span>{question.answer02}</span>
            <br></br>
            {question.answer04}
          </label>
        </div>
      </div>

      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          className="btn btn-outline-dark"
          style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}
          onClick={() => {
            history.push({ pathname: "/test", state: state });
            window.scrollTo(0, 0);
          }}
          disabled={ans.length === 0}
        >
          검사시작
        </button>
      </div>
    </div>
  );
}
