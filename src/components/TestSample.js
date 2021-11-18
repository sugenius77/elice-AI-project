import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

 export function TestSample(){
    const [question,setQuestion] = useState({});
    const history = useHistory();
    const getSample = async()=>{
        try{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=d419b256f1ead87608a0cd82a8dad3c4&q=6')
            setQuestion ({
                question: res.data.RESULT[0].question,
                answer01: res.data.RESULT[0].answer01,
                answer02: res.data.RESULT[0].answer02,
                answer03: res.data.RESULT[0].answer03,
                answer04: res.data.RESULT[0].answer04
            })
        } catch(error){
            console.error(error);
        } 
    }
     useEffect(()=>{getSample()},[])
     return(
            <>
                <h1>검사예시</h1>
                <p>
                직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br></br>
                가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.<br></br>
                </p>
                <button onClick={()=> history.push('/test')}>검사시작</button>
                <p>
                    {question.question}
                </p>
                    <span>{question.answer01}</span>
                    <span>{question.answer02}</span>
                    <span>{question.answer03}</span>
                    <span>{question.answer04}</span>
            </>
) 
}



