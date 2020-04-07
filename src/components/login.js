import React,{ Component } from "react";
import '../stylesheets/LoginDesign.css';
import '../stylesheets/NotoSans.css';

class LoginPage extends Component{
    render(){
        return(
            <div>
                <h1 className = "LoginText">LOGIN</h1>
                <h2 className = "LoginRequire">로그인이 필요한 페이지입니다.<br/>
                로그인 후, 이용해주시길 바랍니다</h2>
                <div id = "wrap">
                    <div id = "loginBox">
                        <h3 className = "LoginTitle">FromMyHome</h3>
                        <label htmlFor="" id = "uid">아이디</label>
                        <input id = "uid" type="text" title="아이디"></input>
                        <div className="block"></div>
                        <label htmlFor="" id = "upass">패스워드</label>
                        <input id = "upass" type="text" title="패스워드"></input>
                        <div className="block"></div>
                            <span className="btn">
                                <input id="loginbtn" type="submit" value="Login"/>
                            </span>
                            <span className="create">
                                <a href="/create" className="createAccount">Create Account</a>
                            </span>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginPage