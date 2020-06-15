import React,{Component} from 'react';
import '../stylesheets/PacificoFont.css';
import '../stylesheets/RobotoFont.css';
// import { Link, BrowserRouter as Router} from "react-router-dom";
// Link to 는 새로고침을 안하고 기존컴포넌트를 유지시킨채로 변경된 내용만 보여줌

class Header extends Component{
    state = {
        LoginText : false
    }
    componentDidMount(){
        this._getId()
        console.log(this.state)
    }
    // 아이디를 불러오기
    callLogin = () =>{
        return fetch("http://localhost:5000/",{ credentials: 'include' })
        .then(res=>{
            let _Idtext = res.json()
            return _Idtext
        })
    }
    _getId = async () =>{
        const GetLogin = await this.callLogin()
        this.setState({
            LoginText : GetLogin.loginresult
        })
    }
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
            {/* false(비로그인)일 경우 login헤더를 출력하고 아닐경우 로그아웃 헤더를 출력 */}
            {this.state.LoginText !== false ? <LoginHeader success={this.state.LoginText}/>:<LogoutHeader logout='로그인'/>}
        </nav>
        </header>
        );
    }
}
class LoginHeader extends Component{
    render(){
        return(
            <span className="individualMenu">
                {this.props.success}님 환영합니다
            </span>
        )
    }
}
class LogoutHeader extends Component{
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(
            <span className="individualMenu">
                <a href ="/login">{this.props.logout}</a>
            </span>
        )
    }
}
export default Header