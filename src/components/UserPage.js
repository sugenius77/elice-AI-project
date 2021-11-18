import {useHistory} from 'react-router-dom';

export function UserPage() {
  const history = useHistory();
  return (
    <div>
      <header><h1>직업가치관검사</h1></header>
      <form>
        <p>이름</p>
        <input type="text" name="user_name" />
        <p>성별</p>
        <input type="radio" name="gender" value='male' /> 남자 <br></br>
        <input type="radio" name="gender" value='female' /> 여자 <br></br>
      </form>
       <button onClick={()=> history.push('/sample')}>검사시작</button>
    </div>
);
}
