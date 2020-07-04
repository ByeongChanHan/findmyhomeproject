/*global kakao*/
import React,{Component} from 'react';
import Header from '../components/HeaderComponent'
import '../stylesheets/askDesign.css'
import '../stylesheets/NotoSans.css'

class Askquestion extends Component{
    componentDidMount(){
        let container = document.getElementById('map');
		let map = new kakao.maps.Map(container,{
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level:3
        })
        return map;
    }
    render(){
        return(
            <div>
                <Header/>
                <section className = "ask">
                    <h1>질문하기</h1>
                </section>
                <div className ="askcontainer">
                    <div className="asktable">
                        <h1>글쓰기</h1>
                        {/* 제목부분 */}
                        <div className="titlearea">
                            <b>제목</b>
                            <input type="text" id="title"></input>
                        </div>
                        <div className="optionarea">
                            <b>옵션</b>
                            {/* 옵션선택부분 */}
                            <select className = "select">
                                <option defaultValue>매물종류</option>
                                <option>매매</option>
                                <option>전세</option>
                                <option>월세</option>
                            </select>
                            <select className = "select">
                                <option defaultValue>층수</option>
                                <option>지상층</option>
                                <option>반지하</option>
                                <option>옥탑</option>
                            </select>
                            <select className = "select">
                                <option defaultValue>구조</option>
                                <option>원룸</option>
                                <option>복층</option>
                                <option>투룸</option>
                                <option>쓰리룸 이상</option>
                            </select>
                            {/* 내용부분 */}
                        </div>
                        <div className="writetext">
                            <b>내용</b>
                            <textarea type="text" id ="textarea" placeholder="내용을 입력해주세요"></textarea>
                        </div>
                    </div>
                    <h1>위치 선택</h1>
                    <div className="mapdesign" id="map"></div>
                    <hr></hr>
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
        var sendId;
        // 만약 로그인 되어있지 않다면 idtext라는 아이디를 찾을수가 없음
        if(document.getElementById("idtext")===null){
            alert("로그인 후 이용해주세요")
            // 로그인페이지로 이동하게끔 하고
            window.location.href ="/login"
            // false리턴해서 빠져나간다
            return false
        }
        else{
            // 로그인 성공하면 idtext에 있는 텍스트를 sendId 변수에 저장한다
            sendId = document.getElementById("idtext").innerText
        }
        // 제목 내용 둘중 하나라도 입력 안했을경우
        if((writeTitle)==="" || textData===""){
            alert("제목과 내용을 입력해주세요")
            return false;
        }
        // _Data 객체 생성
        var _Data = {}
        // title과 inputText키는 아까 불러왔던 id 값
        var selectArray = []
        // 기본선택인 매물종류,층수,구조(아무선택도 안하고) 버튼을 누를경우
        for(var Index = 0; Index<SelectText.length; Index++){
            if(SelectText[Index].value==='매물종류' || SelectText[Index].value==='층수' || SelectText[Index].value==='구조'){
                alert('옵션을 선택해주세요')
                return false;
            }
            // 인덱스가 증가하면서 selectArray에 추가해준다
            selectArray.push(SelectText[Index].value)
        }
        // 객체의 키값에 value값 설정해준 다음
        _Data.selectoptions = selectArray
        _Data.title = writeTitle
        _Data.inputText = textData
        _Data.writeid = sendId
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