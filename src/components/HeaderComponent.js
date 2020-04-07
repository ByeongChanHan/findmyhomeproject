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
                <a href ="/">Home</a>
                </span>
            <span className="individualMenu">
                {/* <Link to = "/showclass">
                    Class
                </Link> */}
                <a href ="/showclass">Class</a>
            </span>
            <span className="individualMenu">
                {/* <Link to = "/login">
                    Log in
                </Link> */}
                <a href ="/login">Log in</a>
            </span>
        </nav>
        </header>
        );
    }
}
export default Header