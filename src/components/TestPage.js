import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./style.module.css";

export function TestPage() {
  const history = useHistory();
  const [question, setQuestion] = useState([]);
  const [totalData, setTotalData] = useState(0); //총 데이터 수
  let dataPerPage = 5; //한 페이지에 나타낼 문항 수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState({});
  const [isValid, setIsValid] = useState(false);
  const { state } = useLocation();
  // 현재 페이지에 해당 키값이 있는지 확인하기
  function validationCheck() {
    const getPageNumber = (curPageNumber) => {
      // eslint-disable-next-line default-case
      switch (curPageNumber) {
        case 1:
          return ["B1", "B2", "B3", "B4", "B5"];
        case 2:
          return ["B6", "B7", "B8", "B9", "B10"];
        case 3:
          return ["B11", "B12", "B13", "B14", "B15"];
        case 4:
          return ["B16", "B17", "B18", "B19", "B20"];
        case 5:
          return ["B21", "B22", "B23", "B24", "B25"];
        case 6:
          return ["B26", "B27", "B28"];
      }
    };
    let array = getPageNumber(currentPage);
    let flag = true;
    for (let i = 0; i < array.length; i++) {
      if (Object.keys(result).includes(array[i]) === false) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  const getQuestion = async () => {
    try {
      const res = await axios.get(
        "https://www.career.go.kr/inspct/openapi/test/questions?apikey=d419b256f1ead87608a0cd82a8dad3c4&q=6"
      );
      setQuestion(res.data.RESULT);
      setTotalData(res.data.RESULT.length);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    let flag = validationCheck();
    setIsValid(flag);
    let selectLength = Object.keys(result).length;
    setProgress(selectLength);
  }, [result, currentPage]);
  // 체크한 값 저장
  // 그냥 sort했더니 B1, B10, B11, B12로 ... 그래서 function 추가
  const sortedKeys = Object.keys(result).sort(function (a, b) {
    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
  });
  let resultArray = [];
  for (let i = 0; i < sortedKeys.length; i++) {
    let text = sortedKeys[i] + "=" + result[sortedKeys[i]];
    resultArray.push(text);
  }

  // 콘솔에 찍어서 확인
  console.log(sortedKeys);
  console.log(resultArray.join(" "));

  return (
    <>
      <h1 className={styles.testTitle}>검사진행</h1>
      <span className={styles.realPercent}>
        {Math.ceil((progress / 28) * 100)}%
      </span>
      <div
        class="progress"
        style={{
          width: "90%",
          margin: "0 auto",
          position: "relative",
          bottom: "60px",
        }}
      >
        <div
          class="progress-bar progress-bar-striped bg-success  progress-bar-animated"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: Math.ceil((progress / 28) * 100) + "%" }}
        ></div>
      </div>
      <div>
        {question.length ? (
          question.slice((currentPage - 1) * 5, currentPage * 5).map((obj) => {
            return (
              <div className={styles.questionBox}>
                <p className={styles.question}>
                  Q{obj.qitemNo}. {obj.question}
                </p>
                <div
                  class="btn-group col-10 mx-auto"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    id={`danger-outlined-${obj.qitemNo}-L`}
                    autocomplete="off"
                    value={obj.answerScore01}
                    checked={result[`B${obj.qitemNo}`] === obj.answerScore01}
                    onChange={(e) => {
                      setResult({
                        ...result,
                        [`B${obj.qitemNo}`]: e.target.value,
                      });
                    }}
                  />
                  <label
                    class="btn btn-outline-success"
                    for={`danger-outlined-${obj.qitemNo}-L`}
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      fontFamily: "Hahmlet",
                      textAlign: "center",
                    }}
                  >
                    {obj.answer01}
                    <br></br>
                    {obj.answer04}
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    id={`success-outlined-${obj.qitemNo}-R`}
                    autocomplete="off"
                    value={obj.answerScore02}
                    checked={result[`B${obj.qitemNo}`] === obj.answerScore02}
                    onChange={(e) => {
                      setResult({
                        ...result,
                        [`B${obj.qitemNo}`]: e.target.value,
                      });
                    }}
                  />
                  <label
                    class="btn btn-outline-success"
                    for={`success-outlined-${obj.qitemNo}-R`}
                    style={{
                      fontWeight: "bold",
                      fontSize: "19px",
                      fontFamily: "Hahmlet",
                    }}
                  >
                    {obj.answer02}
                    <br></br>
                    {obj.answer04}
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
      {currentPage === 1 ? (
        <div></div>
      ) : (
        <button
          class="btn btn-outline-dark"
          style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          이전
        </button>
      )}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        class="btn btn-outline-dark"
        style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}
        onClick={() => {
          if (currentPage === Math.round(totalData / dataPerPage)) {
            history.push({
              pathname: "/end",
              state: { ...state, result: resultArray },
            });
          }
          setCurrentPage(currentPage + 1);
          window.scrollTo(0, 0);
        }}
        disabled={!isValid}
      >
        다음
      </button>
    </>
  );
}
