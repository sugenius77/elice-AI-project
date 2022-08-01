import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./style.module.css";

export function TestPage() {
  const history = useHistory();
  const [question, setQuestion] = useState([]);
  const [totalData, setTotalData] = useState(0);
  let dataPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [selectAns, setSelectAns] = useState({});
  const [isValid, setIsValid] = useState(false);
  const { state } = useLocation();

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

  function validationCheck() {
    const getPageNumber = (curPageNumber) => {
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
      if (Object.keys(selectAns).includes(array[i]) === false) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  useEffect(() => {
    getQuestion();
  }, []);
  useEffect(() => {
    let flag = validationCheck();
    setIsValid(flag);
    let selectLength = Object.keys(selectAns).length;
    setProgress(selectLength);
  }, [selectAns, currentPage]);
  const sortedKeys = Object.keys(selectAns).sort(function (a, b) {
    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
  });
  let resultArray = [];
  for (let i = 0; i < sortedKeys.length; i++) {
    let text = sortedKeys[i] + "=" + selectAns[sortedKeys[i]];
    resultArray.push(text);
  }
  return (
    <>
      <h1 className={styles.testTitle}>검사진행</h1>
      <span className={styles.realPercent}>
        {Math.ceil((progress / 28) * 100)}%
      </span>
      <div
        className="progress"
        style={{
          width: "90%",
          margin: "0 auto",
          position: "relative",
          bottom: "60px",
        }}
      >
        <div
          className="progress-bar progress-bar-striped bg-info  progress-bar-animated"
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
                <div className={styles.switchField}>
                  <input
                    type="radio"
                    id={`danger-outlined-${obj.qitemNo}-L`}
                    autocomplete="off"
                    value={obj.answerScore01}
                    checked={selectAns[`B${obj.qitemNo}`] === obj.answerScore01}
                    onChange={(e) => {
                      setSelectAns({
                        ...selectAns,
                        [`B${obj.qitemNo}`]: e.target.value,
                      });
                    }}
                  />
                  <label for={`danger-outlined-${obj.qitemNo}-L`}>
                    <span>{obj.answer01}</span>
                    <br></br>
                    {obj.answer03}
                  </label>
                  <input
                    type="radio"
                    id={`success-outlined-${obj.qitemNo}-R`}
                    autocomplete="off"
                    value={obj.answerScore02}
                    checked={selectAns[`B${obj.qitemNo}`] === obj.answerScore02}
                    onChange={(e) => {
                      setSelectAns({
                        ...selectAns,
                        [`B${obj.qitemNo}`]: e.target.value,
                      });
                    }}
                  />
                  <label for={`success-outlined-${obj.qitemNo}-R`}>
                    <span>{obj.answer02}</span>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        {currentPage === 1 ? (
          <div></div>
        ) : (
          <button
            className="btn btn-outline-dark col-1"
            style={{
              marginRight: "20px",
              fontFamily: "Nanum Gothic",
              fontWeight: "bold",
            }}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            이전
          </button>
        )}
        <button
          className="btn btn-outline-dark col-1"
          style={{
            fontFamily: "Nanum Gothic",
            fontWeight: "bold",
          }}
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
      </div>
    </>
  );
}
