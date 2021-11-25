import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./style.module.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export function ResultPage() {
  const { state } = useLocation();
  let startDtm = +new Date(); // 밀리터리세컨드로 표현된 현재 시간
  let answers = state.result.join(" "); // 결과값
  const [chart, setChart] = useState([]);

  let one = [];
  let two = [];
  let seven = [];
  let eight = [];
  const [edu, setEdu] = useState({
    high: "",
    junior: "",
    universe: "",
    graduate: "",
  });
  const [major, setMajor] = useState({
    all: "",
    human: "",
    society: "",
    education: "",
    engineering: "",
    nature: "",
    medical: "",
    artSports: "",
  });
  /// 날짜 포맷 변경
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;
  ///
  let obj = {};
  let high = [];
  let junior = [];
  let universe = [];
  let graduate = [];
  let all = [];
  let human = [];
  let society = [];
  let education = [];
  let engineering = [];
  let nature = [];
  let medical = [];
  let artSports = [];
  const data = {
    apikey: "d419b256f1ead87608a0cd82a8dad3c4",
    qestrnSeq: "6",
    trgetSe: "100209",
    name: state.name,
    gender: state.gender,
    grade: " ",
    startDtm: startDtm,
    answers: answers,
  };
  const getResult = async () => {
    try {
      const postData = await axios.post(
        "https://www.career.go.kr/inspct/openapi/test/report",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
      let urlSeq = postData.data.RESULT.url.split("?")[1];
      if (postData.data) {
        const getData = await axios.get(
          "https://www.career.go.kr/inspct/api/psycho/report?" + urlSeq
        );
        getData.data.result.wonScore.split(" ").forEach((item) => {
          let data = item.split("=");
          if (data[0] !== "") {
            obj = {
              ...obj,
              [data[0]]: data[1],
            };
          }
        });
        console.log(getData.data.result.wonScore);
        setChart(obj);
      }
      let sortobj = [];
      for (let number in obj) {
        sortobj.push([number, obj[number]]);
      }
      sortobj.sort(function (a, b) {
        return b[1] - a[1];
      });
      console.log(obj);
      console.log(sortobj);
      console.log(sortobj[0][0]);
      console.log(sortobj[1][0]);

      let number1 = sortobj[0][0];
      let number2 = sortobj[1][0];

      const getEdu = await axios.get(
        "https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=" +
          number1 +
          "&no2=" +
          number2
      );

      const getMajor = await axios.get(
        "https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=" +
          number1 +
          "&no2=" +
          number2
      );

      for (let i = 0; i < getEdu.data.length; i++) {
        if (getEdu.data[i][2] === 2) {
          high.push(getEdu.data[i][1] + "\u00a0");
        } else if (getEdu.data[i][2] === 3) {
          junior.push(getEdu.data[i][1] + "\u00a0");
        } else if (getEdu.data[i][2] === 4) {
          universe.push(getEdu.data[i][1] + "\u00a0");
        } else if (getEdu.data[i][2] === 5) {
          graduate.push(getEdu.data[i][1] + "\u00a0");
        }
      }
      setEdu({
        high: high,
        junior: junior,
        universe: universe,
        graduate: graduate,
      });
      for (let i = 0; i < getMajor.data.length; i++) {
        if (getMajor.data[i][2] === 0) {
          all.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 1) {
          human.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 2) {
          society.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 3) {
          education.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 4) {
          engineering.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 5) {
          nature.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 6) {
          medical.push(getMajor.data[i][1] + "\u00a0");
        } else if (getMajor.data[i][2] === 7) {
          artSports.push(getMajor.data[i][1] + "\u00a0");
        }
      }
      setMajor({
        all: all,
        human: human,
        society: society,
        education: education,
        engineering: engineering,
        nature: nature,
        medical: medical,
        artSports: artSports,
      });
      console.log(edu);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResult();
  }, []);
  ////////////////// 그냥 확인 값
  console.log(chart);
  ///////////////////
  const chartData = [
    {
      name: "능력발휘",
      value: chart[1],
      number: "1",
    },
    {
      name: "자율성",
      value: chart[2],
      number: "2",
    },
    {
      name: "보수",
      value: chart[3],
      number: "3",
    },
    {
      name: "안전성",
      value: chart[4],
      number: "4",
    },
    {
      name: "사회적 인정",
      value: chart[5],
      number: "5",
    },
    {
      name: "사회봉사",
      value: chart[6],
      number: "6",
    },
    {
      name: "자기계발",
      value: chart[7],
      number: "7",
    },
    {
      name: "창의성",
      value: chart[8],
      number: "8",
    },
  ];

  let sortrank = [];
  for (let number in chart) {
    sortrank.push([number, chart[number]]);
  }
  sortrank.sort(function (a, b) {
    return b[1] - a[1];
  });

  for (let i = 0; i < sortrank.length; i++) {
    if (sortrank[0][0] === chartData[i].number) {
      one.push(chartData[i].name);
    } else if (sortrank[1][0] === chartData[i].number) {
      two.push(chartData[i].name);
    } else if (sortrank[6][0] === chartData[i].number) {
      seven.push(chartData[i].name);
    } else if (sortrank[7][0] === chartData[i].number) {
      eight.push(chartData[i].name);
    }
  }

  return (
    <div className={styles.contents}>
      <h1 className={styles.resultTitle}>직업가치관검사 결과표</h1>
      <hr />
      <div className={styles.valueDescription}>
        직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
        신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의
        역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때
        상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이
        가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
        기회를 제공합니다.
      </div>
      <table>
        <thead className={styles.userInfo}>
          <tr>
            <th>이름</th>
            <th>성별</th>
            <th>검사일</th>
          </tr>
        </thead>
        <tbody className={styles.userValue}>
          <tr>
            <td>{state.name} </td>
            <td>{state.gender === "100324" ? "여자" : "남자"}</td>
            <td>{dateString}</td>
          </tr>
        </tbody>
      </table>
      <strong className={styles.number1}> 1. 직업가치관 결과</strong>
      <p className={styles.resultDescription}>
        직업생활과 관련하여 {state.name}님은{" "}
        <span style={{ fontWeight: "bold" }}>
          {one}, {two}
        </span>
        를(을) 가장 중요하게 생각합니다. <br></br>반면에{" "}
        <spans style={{ fontWeight: "bold" }}>
          {seven}, {eight}
        </spans>
        은(는) 상대적으로 덜 중요하게 생각합니다.
      </p>
      <p className={styles.chart}>
        <BarChart width={1190} height={450} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={"name"}
            style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"value"} fill="#82ca9d " />
        </BarChart>
      </p>
      <h3 className={styles.jobs}>
        각각의 가치관이 갖는 의미는 다음과 같습니다.
      </h3>
      <div style={{ width: "50%", float: "left" }}>
        <img alt="ability" src="img/ability.png" className={styles.valueImg} />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나의 능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 나의 능력을 충분히 발휘할 수 있는 기회와 가능성이 주어지는
              직업을 선택할 것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              직업생활에서의 경쟁은 나를 도전적으로 만들어주고, 어려운 일을
              하나씩 해결해 나가는 과정에서 성취감을 느낄 것 입니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img
          alt="autonomy"
          src="img/autonomy.png"
          className={styles.valueImg}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나는 어떤 일을 할 때 규칙, 절차, 시간 등을 스스로 결정하길
              원합니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 다른 것보다 일하는 방식과 스타일이 자유로운 직업을 선택할
              것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              나만의 방식에 맞게 자율적으로 일할 때 나의 능력을 더욱 효과적으로
              발휘할 수 있습니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img alt="money" src="img/money.png" className={styles.valueImg} />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나의 충분한 경제적 보상이 매우 중요하다고 생각합니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나의 노력과 성과에 대해 충분한 경제적 보상이 주어지는 직업을
              선택할 것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              충분한 보수를 받는다면 일의 어려움과 힘겨움에 관계없이 최선을 다해
              노력할 것입니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img
          alt="stability"
          src="img/stability.png"
          className={styles.valueImg}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나는 매사가 계획한대로 안정적으로 유지되는 것을 좋아합니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 쉽게 해고되지 않고 오랫동안 일할 수 있는 직업을 선택할
              것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              안정적인 직업생활이 보장된다면 편안한 마음으로 더욱 열심히 일을 할
              것입니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img
          alt="reputation"
          src="img/reputation.png"
          className={styles.valueImg}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나는 다른 사람들로부터 나의 능력과 성취를 충분히 인정받고
              싶어합니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 많은 사람들로부터 주목받고 인정받을 수 있는 직업을 선택할
              것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              주변사람들이 나를 긍정적으로 평가하면 나의 능력발휘에 더욱 도움이
              될 것입니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img
          alt="volunteer"
          src="img/volunteer.png"
          className={styles.valueImg}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나는 다른 사람을 돕고 더 나은 세상을 만들고 싶습니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 사람, 조직, 국가, 인류에 대한 봉사와 기여가 가능한 직업을
              선택할 것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              도움과 격려가 필요한 사람들에게 힘을 줄 수 있는 직업생활을 할 때
              가치와 보람을 느낄 것입니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img
          alt="self-develope"
          src="img/self-develope.png"
          className={styles.valueImg}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나는 항상 새로운 것을 배우고 스스로 발전해 나갈 때 만족을
              느낍니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 나의 능력과 소질을 지속적으로 발전시킬 수 있는 직업을 선택할
              것입니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              나 스스로가 발전할 수 있는 기회가 충분히 주어지는 직업생활을 할 때
              만족감을 느낄 것입니다.
            </td>
          </tr>
        </table>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <img
          alt="creativity"
          src="img/creativity.png"
          className={styles.valueImg}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.valueTable}>
          <tr>
            <th className={styles.valueTh}>특징</th>
            <td className={styles.valueTd}>
              나는 예전부터 해오던 것 보다는 새로운 것을 만들어 내는 것을 매우
              좋아합니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업선택</th>
            <td className={styles.valueTd}>
              나는 늘 변화하고 혁신적인 아이디어를 내며, 창조적인 시도를 하는
              직업을 선택하고 싶습니다.
            </td>
          </tr>
          <tr>
            <th className={styles.valueTh}>직업생활</th>
            <td className={styles.valueTd}>
              나는 새롭고 독창적인 것을 만들어 내는 과정에서 능력을 충분히
              발휘할 수 있을 것입니다.
            </td>
          </tr>
        </table>
      </div>

      <strong strong className={styles.number2}>
        2. 나의 가치관과 관련이 높은 직업
      </strong>
      <h3 className={styles.jobs}>종사자 평균 학력별</h3>
      <table className={styles.jobsTable}>
        <tr>
          <th className={styles.jobsTh} scope="row">
            학력
          </th>
          <td className={styles.jobsTh}>직업</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            고등학교 졸업
          </th>
          <td className={styles.jobsTd}>{edu.high}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            {" "}
            전문대학교 졸업
          </th>
          <td className={styles.jobsTd}>{edu.junior}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            {" "}
            대학교 졸업
          </th>
          <td className={styles.jobsTd}>{edu.universe}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            {" "}
            대학원 졸업
          </th>
          <td className={styles.jobsTd}>{edu.graduate}</td>
        </tr>
      </table>
      <h3 className={styles.jobs}>종사자 평균 전공별</h3>
      <table className={styles.jobsTable}>
        <tr>
          <th className={styles.jobsTh} scope="row">
            전공
          </th>
          <td className={styles.jobsTh}>직업</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            계열 무관
          </th>
          <td className={styles.jobsTd}>
            {major.all}
            {major.human}
            {major.society}
            {major.education}
            {major.engineering} {major.nature} {major.medical} {major.artSports}
          </td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            인문
          </th>
          <td className={styles.jobsTd}>{major.human}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            사회
          </th>
          <td className={styles.jobsTd}>{major.society}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            교육
          </th>
          <td className={styles.jobsTd}>{major.education}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            공학
          </th>
          <td className={styles.jobsTd}>{major.engineering}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            자연
          </th>
          <td className={styles.jobsTd}>{major.nature}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            의학
          </th>
          <td className={styles.jobsTd}>{major.medical}</td>
        </tr>
        <tr>
          <th className={styles.jobsTh} scope="row">
            예체능
          </th>
          <td className={styles.jobsTd}>{major.artSports}</td>
        </tr>
      </table>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          class="btn btn-outline-dark"
          style={{
            fontFamily: "Nanum Gothic",
            fontWeight: "bold",
            marginRight: "80px",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          다시 검사하기
        </button>
      </div>
    </div>
  );
}
