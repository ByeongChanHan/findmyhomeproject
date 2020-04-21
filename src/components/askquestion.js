import React,{Component} from 'react';
import Header from '../components/HeaderComponent'
import '../stylesheets/askDesign.css'

class Askquestion extends Component{
    render(){
        const titlestyle={
            height : '50px',
            lineHeight:'50px',
            fontWeight:'bold'
        }
        const optionstyle={
            height : '45px',
            lineHeight:'50px',
            fontWeight:'bold'
        }
        const descwrite={
            height : '470px',
            lineHeight:'470px',
            fontWeight:'bold'
        }
        const pageTitle={
            textAlign : 'left'
        }
        return(
            <div className ="askcontainer">
            <Header/>
            <h1 style={pageTitle}>매물의뢰</h1>
            <div className="asktable">
                <td>
                    <td style={titlestyle}>제목</td>
                    <tr>
                    <td style={optionstyle}>옵션</td>
                    </tr>
                    <tr>
                    <td style={descwrite}>내용</td>
                    </tr>
                </td>
            <table>
                    <input type="text" name="titleplace" id="title"></input>
                    <select className = "select">
                        <option selected>지역선택</option>
                        <option>서울</option>
                        <option>인천</option>
                        <option>경기</option>
                    </select>
                    <select className = "select">
                        <option selected>매물종류</option>
                        <option>매매</option>
                        <option>전세</option>
                        <option>월세</option>
                    </select>
                    <select className = "select">
                        <option selected>층수</option>
                        <option>지상층</option>
                        <option>반지하</option>
                        <option>옥탑</option>
                    </select>
                    <select className = "select">
                        <option selected>구조</option>
                        <option>원룸</option>
                        <option>복층</option>
                        <option>투룸</option>
                        <option>쓰리룸 이상</option>
                    </select>
            <br></br>
            {/* 선택부분 */}
                    <textarea type="text" name="textareaplace" id ="textarea"></textarea><br></br>
            {/* 입력창부분 */}
            </table>
            </div>
            <button className = "askBtn" onClick={this._sendText}>
                질문하기
            </button>
            {/* 버튼 */}
            </div>
        )
    }
    _sendText = () => {
        var writeTitle = document.getElementById('title').value;
        var textData = document.getElementById('textarea').value;
        if((writeTitle)==="" || textData===""){
            alert("제목과 내용을 입력해주세요")
            return false;
        }
        var _Data = {}
        _Data.title = writeTitle
        _Data.inputText = textData
        console.log(_Data);
        const requestOptions = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(_Data)
        }
        fetch("http://localhost:5000/write",requestOptions)
        .then(response => console.log(response.text()))
    }
}
export default Askquestion
