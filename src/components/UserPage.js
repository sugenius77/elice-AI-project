import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";
export function UserPage() {
  const history = useHistory();
  const [user, setUser] = useState({ name: "", gender: "" });
  // user에 value 값 넣기
  const onHandleChange = (e) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    if (targetName === "name") {
      setUser({ ...user, name: targetValue });
    } else if (targetName === "male") {
      setUser({ ...user, gender: targetValue });
    } else if (targetName === "female") {
      setUser({ ...user, gender: targetValue });
    }
  };

  return (
    <div className={styles.box}>
      <img style={{ width: "330px" }} alt="main" src="/img/main.png" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p>
          <label for="inputName" className={styles.infoName}>
            이름
          </label>
          <input
            type="text"
            id="inputName"
            name="name"
            value={user.name}
            onChange={onHandleChange}
          />
        </p>
        <p>
          <label for="inputGender" className={styles.infoGender}>
            성별
          </label>
          <input
            type="radio"
            name="male"
            id="inputMale"
            value="100323"
            checked={user.gender === "100323"}
            onChange={onHandleChange}
          />{" "}
          남자 <br></br>
          <input
            type="radio"
            name="female"
            value="100324"
            id="inputFemale"
            checked={user.gender === "100324"}
            onChange={onHandleChange}
          />{" "}
          여자 <br></br>
        </p>
      </form>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          type="button"
          style={{ fontFamily: "Nanum Gothic", fontWeight: "bold" }}
          class="btn btn-outline-dark"
          onClick={() => {
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
            // 숫자, 특수문자 제외,, 한글이랑 영어만 가능
            if (user.name === "") {
              alert("이름을 입력하세요.");
              return false;
            }
            if (user.gender === "") {
              alert("성별을 선택하세요.");
              return false;
            }
            if (!regex.test(user.name)) {
              alert("올바른 이름을 입력하세요.");
              return false;
            }
            history.push({ pathname: "/sample", state: user });
          }}
          disabled={user.name.length === 0 && user.gender.length === 0}
        >
          검사시작
        </button>
      </div>
    </div>
  );
}
