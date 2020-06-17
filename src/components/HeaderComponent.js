import React,{Component} from 'react';
import '../stylesheets/PacificoFont.css';
import '../stylesheets/RobotoFont.css';

class Header extends Component{
    state = {
        LoginText : false
    }
    componentDidMount(){
        this._getId()
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
        render(){
        return(
        <header>
            <div className = "title">
                <a href = "/">FindMyHome</a>
            </div>
            <nav className = "navigate">
                <span className="individualMenu">
                <a href ="/">홈</a>
                </span>
            <span className="individualMenu">
                <a href ="/ask">질문하기</a>
            </span>
            <span className="individualMenu">
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
        const logoutbtnstyle = {
            border : 0,
            backgroundColor : "transparent",
            color : "white",
            fontSize:"20px",
            fontWeight : "bold"
        }
        return(
            <section className="idsection">
                <span className="individualMenu">
                    <button style={logoutbtnstyle} onClick={this.logoutReq}>로그아웃</button>
                </span>
                <span className="individualMenu">
                    <p id="idtext">{this.props.success}</p>
                </span>
            </section>
        )
    }
    logoutReq = () =>{
        fetch("http://localhost:5000/logout",{ credentials: 'include' })
        .then(res => res.text())
        // 페이지를 새로고침
        window.location.reload(true);
    }
}
class LogoutHeader extends Component{
    render(){
        return(
            <span className="individualMenu">
                {/* this.props.logout은 로그아웃 텍스트라 로그아웃글자가 출력됨 */}
                <a href ="/login">{this.props.logout}</a>
            </span>
        )
    }
}
export default Header