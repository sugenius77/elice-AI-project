import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./style.module.css";
export function TestEnd() {
  const history = useHistory();
  const { state } = useLocation();
  return (
    <p className={styles.endBox}>
      <p className={styles.finish}>검사가 완료되었습니다.</p>
      <p className={styles.description}>
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해
        볼 기회를 제공합니다.
      </p>
      <button
        class="btn btn-outline-dark"
        style={{
          fontFamily: "Nanum Gothic",
          fontWeight: "bold",
          margin: "10px 40px 0 0",
        }}
        onClick={() =>
          history.push({
            pathname: "/result",
            state: { ...state },
          })
        }
      >
        {state.name}님의 결과보기
      </button>
    </p>
  );
}
