import React,{ Component,Fragment} from "react";
import '../stylesheets/LoginDesign.css';
import '../stylesheets/NotoSans.css';
import Header from './HeaderComponent';

class LoginPage extends Component{
    render(){
        return(
            <Fragment>
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
                        <input id = "uid" type="text" name="id" title="아이디" onKeyPress={this._enterlogin}></input>
                        <div className="block"></div>
                        <label htmlFor="" id = "upass">패스워드</label>
                        <input id = "upass" type="password" name="password" title="패스워드" onKeyPress={this._enterlogin}></input>
                        <div className="block"></div>
                            <span className="btn">
                                <input id="loginbtn" type="submit" value="login" onClick={this._login}/>
                            </span>
                            {/* create 파라미터로 이동 */}
                            <span className="create">
                                <a href="/create" className="createAccount">Create Account</a>
                            </span>
                            {/* 체크박스 부분 */}
                            <label id = "isagent">
                            중개사 로그인
                            <input type = 'checkbox' name="check"></input>
                            </label>
                    </div>
                </div>
            </Fragment>
        );
    }
    // 패스워드 확인 메소드
    _login = () =>{
        // 쿼리셀럭터 all은 아이디가 uid인것들을 다 선택해주는데 그중 1번째가 입력부분
        let idtext = document.querySelectorAll("#uid");
        let passwordtext = document.querySelectorAll("#upass");
        // 체크박스 체크여부 true false반환
        let ischecked = document.getElementsByName("check");
        // elements니까 배열을 반환해서 배열의 첫번째 인덱스에 접근
        let ischeckresult = ischecked[0].checked
        var loginData = {}
        // 아이디와 패스워드 체크여부값을 객체에 저장하고
        loginData.idtext = idtext[1].value
        loginData.passwordtext = passwordtext[1].value
        loginData.isagent = ischeckresult
        if(idtext[1].value === ""){
            alert("아이디를 입력하세요");
            return false;
        }
        if(passwordtext[1].value === ""){
            alert("패스워드를 입력하세요")
            return false;
        }
        // request의 body에 객체를 보낸다 (json형식)
        const loginsend = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(loginData),
            credentials: 'include'
        }
        fetch("http://localhost:5000/login",loginsend)
        .then(resLogin=>resLogin.text())
        .then(res=>{
            if(res === "존재하지 않는 ID이거나 비밀번호가 틀립니다"){
                alert(res)
                return false
            }
            else{
                window.location.href = "/board"
            }
        })
    }
    // 엔터 눌렀을때 로그인 작동
    _enterlogin = (event) =>{
        if(event.charCode === 13){
            this._login();
        }
    }
}
export default LoginPage