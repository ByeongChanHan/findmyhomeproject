import React,{Component} from 'react';
import Header from '../components/HeaderComponent'
import '../stylesheets/askDesign.css'
import '../stylesheets/NotoSans.css'

class Askquestion extends Component{
    render(){
        const titlestyle={
            lineHeight:'50px',
            fontWeight:'bold',
            border:0
        }
        const optionstyle={
            lineHeight:'50px',
            fontWeight:'bold',
            borderBottom:'1px solid #999',
            borderRight:0,
            borderLeft:0
        }
        const descwrite={
            lineHeight:'470px',
            fontWeight:'bold',
            border:0
        }
        const pageTitle={
            textAlign : 'left'
        }
        return(
            <div>
                <Header/>
                <section className = "ask">
                    <h1>질문하기</h1>
                </section>
                <div className ="askcontainer">
                    <h1 style={pageTitle}>매물의뢰</h1>
                    <div className="asktable">
                        <tr>
                            <td style={titlestyle}>제목</td>
                            <tr>
                            <td style={optionstyle}>옵션</td>
                            </tr>
                            <tr>
                            <td style={descwrite}>내용</td>
                            </tr>
                        </tr>
                        <table>
                            {/* 제목부분 */}
                            <input type="text" id="title"></input>
                                {/* 선택부분 */}
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
                                {/* 내용부분 */}
                                <textarea type="text" id ="textarea" placeholder="내용을 입력해주세요"></textarea>
                        </table>
                    </div>
                    {/* 질문하기 버튼 */}
                <input type="button" className = "askBtn" onClick={this._sendText} value="질문하기"></input>
                </div>
            </div>
        )
    }
    _sendText = () => {
        // title,textarea id 불러오는 부분
        var writeTitle = document.getElementById('title').value;
        var textData = document.getElementById('textarea').value;
        var SelectText = document.querySelectorAll('.select')
        // 제목 내용 둘중 하나라도 입력 안했을경우
        if((writeTitle)==="" || textData===""){
            alert("제목과 내용을 입력해주세요")
            return false;
        }
        // _Data 객체 생성
        var _Data = {}
        // title과 inputText키는 아까 불러왔던 id 값
        var selectArray = []
        for(var Index = 0; Index<SelectText.length; Index++){
            if(SelectText[Index].value==='매물종류' || SelectText[Index].value==='층수' || SelectText[Index].value==='구조'){
                alert('옵션을 선택해주세요')
                return false;
            }
            selectArray.push(SelectText[Index].value)
        }
        _Data.selectoptions = selectArray
        _Data.title = writeTitle
        _Data.inputText = textData
        console.log(_Data);
        // 요청 옵션 post방식에 데이터를 보내주는 body에는 _Data객체를 stringify
        const requestOptions = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(_Data)
        }
        // 파이썬 플라스크 포트 5000번 write파라미터에 요청옵션 맞춰서 보냄
        fetch("http://localhost:5000/write",requestOptions)
        // 데이터베이스 입력완료후 return으로 게시물 작성을 완료하였습니다를 받으면 text로 바꾸고
        .then(response => response.text())
        // 그 텍스트를 alert로 경고창에 띄움
        .then(resPrint => alert(resPrint))
        // 확인 누르고 3초후 goBoardPage함수호출
        setTimeout(this.goBoardPage,3000)
    }
    // 게시판 페이지로 이동해주는 함수
    goBoardPage = () =>{
        window.location.href = "http://localhost:3000/board"
    }
}
export default Askquestion