import React,{Component} from 'react';
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
        console.log(ConvertUrl)
        return fetch(ConvertUrl)
        .then(res => {
            let selectData = res.json()
            console.log(selectData)
            return selectData
        })
    }
    _getData = async () =>{
        const selectJSON = await this._callUrl()
        this.setState({
            title : selectJSON.SelectTitle,
            userwrote : selectJSON.Selectuserwrote,
            wrotedate : selectJSON.Selectwrotedate,
            viewnum : selectJSON.Selectviewnum
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
                    <div className ="showBoardItem">
                        <img src={Chatimg} className="chat" alt="chatImg"/>
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="boardinformation">
                        <p>작성일 : {this.props.wrotedate}</p>
                        <p>조회수 : {this.props.viewnum}</p>
                    </div>
                    <div className="contents">
                        <p>{this.props.userwrote}</p>
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
                </div>
                <div className = "blankArea">
                    {/* 빈공간 */}
                </div>
                <div className ="commentArea">
                    <h1>답변하기</h1>
                    <textarea type="text" placeholder="댓글을 입력하세요"></textarea>
                    <button type="button" className="Submitbtn">등록</button>
                </div>
                <div className = 'ranking'>
                    <p>테스트영역</p>
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
}
// class Comments extends Component{
//     render(){
//         return(

//         )
//     }
// }
export default Viewboard