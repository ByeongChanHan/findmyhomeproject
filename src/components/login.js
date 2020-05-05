import React,{ Component } from "react";
import '../stylesheets/LoginDesign.css';
import '../stylesheets/NotoSans.css';
import Header from './HeaderComponent';

class LoginPage extends Component{
    render(){
        return(
            <div>
                {/* 헤더 컴포넌트 */}
                <Header/>
                <h1 className = "LoginText">LOGIN</h1>
                <h2 className = "LoginRequire">
                    로그인이 필요한 페이지입니다.<br/>
                    로그인 후, 이용해주시길 바랍니다
                </h2>
                <div id = "wrap">
                    <div id = "loginBox">
                        <h3 className = "LoginTitle">FromMyHome</h3>
                        <label htmlFor="" id = "uid">아이디</label>
                        <input id = "uid" type="text" title="아이디"></input>
                        <div className="block"></div>
                        <label htmlFor="" id = "upass">패스워드</label>
                        <input id = "upass" type="password" title="패스워드"></input>
                        <div className="block"></div>
                            <span className="btn">
                                <input id="loginbtn" type="submit" value="login" onClick = {this._printer}/>
                            </span>
                            {/* create 파라미터로 이동 */}
                            <span className="create">
                                <a href="/create" className="createAccount">Create Account</a>
                            </span>
                    </div>
                </div>
            </div>
        );
    }
    // 패스워드 확인 메소드
    _printer = () =>{
        // 쿼리셀럭터 all은 아이디가 uid인것들을 다 선택해주는데 그중 1번째가 입력부분
        let idtext = document.querySelectorAll("#uid");
        let passwordtext = document.querySelectorAll("#upass");
        if(idtext[1].value === "")
        alert("아이디를 입력하세요");

        if(passwordtext[1].value === "")
        alert("패스워드를 입력하세요")
    }
}
export default LoginPage