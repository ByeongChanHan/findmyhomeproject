import React,{Component} from 'react';
import '../stylesheets/PacificoFont.css';
import '../stylesheets/RobotoFont.css';
// import { Link, BrowserRouter as Router} from "react-router-dom";
// Link to 는 새로고침을 안하고 기존컴포넌트를 유지시킨채로 변경된 내용만 보여줌

class Header extends Component{
    // 헤더에서 모든 라우팅을 설명하겠음
    // / : 홈
    // /ask : 질문하기
    //  /board : 게시판
    //  /login : 로그인
    //  /create : 일반사용자 중개사 선택 페이지
    //  /register,/register2 호환 안돼서 적당한 템플릿 찾아보는중
        render(){
        return(
        // <Router>
        <header>
            <div className = "title">
                <a href = "/">FindMyHome</a>
            </div>
            <nav className = "navigate">
                <span className="individualMenu">
                {/* <Link to = "/">
                    Home
                </Link> */}
                <a href ="/">홈</a>
                </span>
            <span className="individualMenu">
                {/* <Link to = "/showclass">
                    Class
                </Link> */}
                <a href ="/ask">질문하기</a>
            </span>
            <span className="individualMenu">
                {/* <Link to = "/showclass">
                    Class
                </Link> */}
                <a href ="/board">게시판</a>
            </span>
            <span className="individualMenu">
                {/* <Link to = "/login">
                    Log in
                </Link> */}
                <a href ="/login">로그인</a>
            </span>
        </nav>
        </header>
        );
    }
}
export default Header