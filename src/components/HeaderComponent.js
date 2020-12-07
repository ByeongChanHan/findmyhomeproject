import React,{Component,Fragment} from 'react';
import '../stylesheets/PacificoFont.css';
import '../stylesheets/RobotoFont.css';
import '../stylesheets/Header.css'

class Header extends Component{
    state = {
        LoginText : false
    }
    componentDidMount(){
        this._getId()
    }
    // 아이디를 불러오기
    callLogin = () =>{
        return fetch("/header",{ credentials: 'include' })
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
                    <a href = "/">홈</a>
                </span>
                <span className="individualMenu">
                    <a href = "/ask">질문하기</a>
                </span>
                <span className="individualMenu">
                    <a href = "/board">게시판</a>
                </span>
                <span className="individualMenu">
                    <a href = "/deal">실거래가 조회</a>
                </span>
                {/* false(비로그인)일 경우 login헤더를 출력하고 아닐경우 로그아웃 헤더를 출력 */}
                {this.state.LoginText !== false ? <LoginHeader success={this.state.LoginText}/>:<LogoutHeader login='로그인'/>}
            </nav>
        </header>
        );
    }
}
class LoginHeader extends Component{
    state = {
        isnotify : false
    }
    render(){
        return(
            <Fragment>
            <section className="idsection">
                <span className="individualMenu" onClick={this.logoutReq}>
                    <button id="logoutbtn">로그아웃</button>
                </span>
                <span className="individualMenu">
                        <button id="idtext">{this.props.success}</button>
                </span>
            </section>
            </Fragment>
        )
    }
    logoutReq = () =>{
        fetch("/logout",{ credentials: 'include' })
        .then(res => res.text())
        // 페이지를 새로고침
        window.location.reload(true);
    }
}
class LogoutHeader extends Component{
    render(){
        return(
            <span className="individualMenu">
                {/* this.props.logout은 로그인 텍스트라 로그인글자 출력됨 */}
                <a href ="/login">{this.props.login}</a>
            </span>
        )
    }
}
export default Header