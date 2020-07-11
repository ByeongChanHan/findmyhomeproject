import React,{Component,Fragment} from 'react';
import Header from './HeaderComponent'
import '../stylesheets/viewboard.css'
import Chatimg from '../images/chat.png'
import Comment from '../images/comment.png'
import Listicon from '../images/list.png'
import '../stylesheets/NotoSans.css'
import $ from "jquery";
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

class Viewboard extends Component{
    state ={

    }
    componentDidMount(){
        this._getData()
    }
    _callUrl = () =>{
        let CurrentUrl = window.location.href;
        // http:localhost:3000/board/제목 을 http:localhost:5000/board/제목 으로 변하게 만드는 줄인데
        // 나중에 서버 배포할때 문제 생기면 수정
        let ConvertUrl = CurrentUrl.replace("3000","5000")
        return fetch(ConvertUrl)
        .then(res => {
            let selectData = res.json()
            return selectData
        })
    }
    _getData = async () =>{
        const selectJSON = await this._callUrl()
        this.setState({
            title : selectJSON.SelectTitle,
            userwrote : selectJSON.Selectuserwrote,
            wrotedate : selectJSON.Selectwrotedate,
            viewnum : selectJSON.Selectviewnum,
            commentList : selectJSON.comment,
            currentTime : selectJSON.currentTime,
            commentid : selectJSON.commentid,
            ranking : selectJSON.rankingdata.slice(0,6),
            categoryoption : selectJSON.categoryoption,
            flooroption : selectJSON.flooroption,
            structureoption : selectJSON.structureoption,
            selectid : selectJSON.selectid
        })
    }
    render(){
        return(
            <div>
            <Header/>
                <div>
                    {this.state.title ? this._SelectBoard() : "로딩중"}
                </div>
            </div>
        )
    }
    _SelectBoard = () =>{
        return <BoardRender title={this.state.title}
        userwrote={this.state.userwrote}
        wrotedate={this.state.wrotedate}
        viewnum={this.state.viewnum}
        comment={this.state.commentList}
        currentTime={this.state.currentTime}
        commentid={this.state.commentid}
        ranking={this.state.ranking}
        categoryoption={this.state.categoryoption}
        flooroption={this.state.flooroption}
        structureoption={this.state.structureoption}
        selectid={this.state.selectid}
        />
    }
}
class BoardRender extends Component{
    state ={
        iscomment : false
    }
    render(){
        return(
            <section>
                <div className="askarea">
                    <div className="boardheader">
                        <div className ="showBoardItem">
                            <img src={Chatimg} className="chat" alt="chatImg"/>
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="boardinformation">
                            <p>작성자 : {this.props.selectid}</p>
                            <b className="option">옵션 : 
                                <span className ="badge">
                                    {this.props.categoryoption}
                                </span>
                                <span className ="badge">
                                    {this.props.flooroption}
                                </span>
                                <span className ="badge">
                                    {this.props.structureoption}
                                </span>
                            </b>
                            <div className ="blank"></div>
                            <p className ="wrotedate">작성일 : {this.props.wrotedate}</p>
                            <p>조회수 : {this.props.viewnum}</p>
                        </div>
                    </div>
                    <div className="contents">
                        <pre className="writecontent">{this.props.userwrote}</pre>
                        <div className="iconArea">
                            <button type="button" onClick={this._Comment} className="commentimg">
                                <img src={Comment} className ="icon" alt="commentImg"></img>
                                <p>답변하기</p>
                            </button>
                            <button type="button" onClick={this._moveBoardUrl} className="listimg">
                                <img src={Listicon} className ="icon" alt="listImg"></img>
                                <p>목록</p>
                            </button>
                        </div>
                    </div>
                    <div className = 'ranking'>
                        <h1 className="rankingTitle">인기 게시물</h1>
                        {this.rankingRender()}
                    </div>
                </div>
                <div className = "blankArea">
                    {/* 빈공간 */}
                </div>
                {this.props.comment ? this.CommentRender():"불러오는 중 입니다."}
                <div className ="commentArea">
                    <h1>답변하기</h1>
                    <textarea type="text" id="commentText" placeholder="댓글을 입력하세요"></textarea>
                    <button type="button" onClick={this.createComment} className="Submitbtn">등록</button>
                </div>
            </section>
        )
    }
    _moveBoardUrl = () =>{
        window.location.href = "/board"
    }
    _Comment = () =>{
        let iscomment = this.state.iscomment
        this.setState({
            iscomment : true
        })
        if(iscomment === false){
            $('.commentArea').fadeTo(1000,1)
        }
        else if(iscomment === true){
            $('.commentArea').fadeTo(1000,0)
            this.setState({
                iscomment : false
            })
        }
    }
    createComment = () =>{
        let CurrentUrl = window.location.href;
        // http:localhost:3000/board/제목 을 http:localhost:5000/board/제목 으로 변하게 만드는 줄인데
        // 나중에 서버 배포할때 문제 생기면 수정
        let ConvertUrl = CurrentUrl.replace("3000","5000");
        var CommentDict = {};
        var sendid;
        var getComment = document.getElementById('commentText').value;
        if(document.getElementById("idtext")===null){
            alert("로그인 후 이용해주세요")
            // 로그인페이지로 이동하게끔 하고
            window.location.href ="/login"
            // false리턴해서 빠져나간다
            return false
        }
        else{
            // 로그인 성공하면 idtext에 있는 텍스트를 sendId 변수에 저장한다
            sendid = document.getElementById("idtext").innerText;
        }
        if(getComment === ""){
            alert("내용을 입력해주세요");
            return false;
        }
        CommentDict.commentText = getComment
        CommentDict.commentid = sendid
        const reqoption = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(CommentDict)
        }
        fetch(ConvertUrl,reqoption)
        .then(resComment =>resComment.text())
        .then(resCommentText=>{
            alert(resCommentText)
            window.location.reload(true)
        })
    }
    // 댓글 렌더링 함수
    CommentRender = () =>{
        const ComArray = this.props.comment.map((CommentArr,index)=>{
            return <Comments comment = {CommentArr}
            currentTime = {this.props.currentTime[index]}
            commentid = {this.props.commentid[index]}
            key = {index}/>
        })
        return ComArray
    }
    // 랭킹 렌더링 함수
    rankingRender = () =>{
        const RankArray = this.props.ranking.map((RankArr,index)=>{
            return <Ranking ranking = {RankArr}
            ranknum = {index+1}
            key = {index}/>
        })
        return RankArray
    }
}
class Ranking extends Component{
    render(){
        return(
            <div className="rankitem">
                <b>{this.props.ranknum}</b>
                <p onClick={this._moveUrl}>{this.props.ranking}</p>
            </div>
        )
    }
    _moveUrl = () =>{
        let CurrentUrl = "http://localhost:5000/ranking"
        // prop의 ranking은 인기조회수 숫자 옆에있는 제목을 뜻함
        let sendrankingData= this.props.ranking
        var rankingdataSet = {}
        rankingdataSet.ranking = sendrankingData
        const reqOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(rankingdataSet)
        }
        fetch(CurrentUrl,reqOptions)
        .then(res => res.json())
        .then(gourl => {
            // response값안 rankingTitle키에 배열이 들어가있는데 그 배열의 0번째가 해당 글의 글목록번호
            var sendUrl = gourl.rankingtitle[0]
            window.location.href = `/board/${sendUrl}`
        })
    }
}
class Comments extends Component{
    componentDidMount(){
        this.enableupdate()
        // console.log(document.getElementById("idtext").innerText)
    }
    enableupdate = () =>{
        if(document.getElementById("idtext")===null){
            const callid = setTimeout(() => {
                window.location.reload(true)
            }, 3000);
            if(document.getElementById("idtext")!==null){
                clearInterval(callid)
            }
        }
        else{
            if(document.getElementById("idtext").innerText === this.props.commentid){
                var selectcomment = this.props.commentid
                var commentArea = document.getElementById(selectcomment)
                var deletebtn = document.createElement("input")
                deletebtn.className = "deletebtn"
                deletebtn.type = "submit"
                deletebtn.value = "삭제"
                deletebtn.onclick = () =>{
                    let commentReqdict = {}
                    let commentsend = this.props.comment
                    commentReqdict.commentText = commentsend
                    const deletereq = {
                        method:'POST',
                        headers:{
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify(commentReqdict)
                    }
                    fetch("http://localhost:5000/delete",deletereq)
                    .then(res=>res.text())
                    .then(response=>{
                        alert(response)
                        window.location.reload(true)
                    })
                }
                // 업데이트 버튼 부분
                var updatebtn = document.createElement("input")
                updatebtn.className = "updatebtn"
                updatebtn.type = "submit"
                updatebtn.value = "수정"
                // 수정누르면 생기는 확인버튼
                var confirmbtn = document.createElement("input")
                confirmbtn.className = "confirmbtn"
                confirmbtn.type = "submit"
                confirmbtn.value = "확인"
                confirmbtn.onclick = () =>{
                    let commentdict = {}
                    // 기존에 있는 댓글 텍스트
                    let oldText = this.props.comment;
                    // 현재 쓰고 있는 댓글 텍스트
                    let updateCommentText = document.getElementById("updateText").value;
                    if(document.getElementById("updateText").value === ""){
                        alert("글을 입력해주세요");
                        return false;
                    }
                    commentdict.oldText = oldText;
                    commentdict.updateText = updateCommentText;
                    const updatereq = {
                        method:'POST',
                        headers:{
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify(commentdict)
                    }
                    fetch("http://localhost:5000/update",updatereq)
                    .then(res=>res.text())
                    .then(updateSuccess=>{
                        alert(updateSuccess);
                        window.location.reload(true)
                    })
                }
                // 업데이트 버튼을 클릭했을때 실행
                updatebtn.onclick = () =>{
                    // 현재 댓글의 본문(본문의 자식태그)
                    var comment = document.getElementById(this.props.comment);
                    // input탭을 새로 생성
                    var updateInput = document.createElement("textarea");
                    updateInput.id = "updateText";
                    updateInput.value = this.props.comment;
                    commentArea.removeChild(deletebtn);
                    commentArea.removeChild(updatebtn);
                    commentArea.replaceChild(updateInput,comment);
                    commentArea.appendChild(confirmbtn);
                }
                commentArea.appendChild(deletebtn)
                commentArea.appendChild(updatebtn)
            }
        }
    }
    render(){
        return(
            <Fragment>
                <div className="comment" id={this.props.commentid}>
                    <h1>{this.props.commentid}님의 답변</h1>
                    <div className = "commentinform">
                    <p>작성일 : {this.props.currentTime}</p>
                    </div>
                    <pre id={this.props.comment}>
                        {this.props.comment}
                    </pre>
                </div>
            </Fragment>
        )
    }
}
export default Viewboard