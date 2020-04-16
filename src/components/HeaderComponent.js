import React,{Component} from 'react';
import '../stylesheets/PacificoFont.css';
import '../stylesheets/RobotoFont.css';
// import { Link, BrowserRouter as Router} from "react-router-dom";
// Link to 는 새로고침을 안하고 기존컴포넌트를 유지시킨채로 변경된 내용만 보여줌



class Header extends Component{
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
<<<<<<< HEAD
                <a href ="/showclass">옵션</a>
=======
                <a href ="/ask">질문하기</a>
>>>>>>> 691b54ad874eb4185ca4ba239ea783cc29f31ab0
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