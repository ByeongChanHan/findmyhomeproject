import React,{Component} from 'react';
import Header from './HeaderComponent'
import '../stylesheets/agentRegister.css'
import '../stylesheets/NotoSans.css'

class Register extends Component{
    Itemlist =[
        {
            pItem : '아이디',
            placeholderItem: 'ID',
            typeselect: 'text',
            id : 'idText'
        },
        {
            pItem : '비밀번호',
            placeholderItem: 'Password',
            typeselect: 'password',
            id : 'pwdText'
        },
        {
            pItem : '비밀번호 재입력',
            placeholderItem: 'Re-Password',
            typeselect: 'password',
            id : 'repwdText'
        },
        {
            pItem : '이메일',
            placeholderItem: 'Email',
            typeselect: 'email',
            id : 'emailText'
        },
        {
            pItem : '전화번호',
            placeholderItem: 'PhoneNumber',
            typeselect: 'text',
            id : 'PhoneNumber'
        }
    ]
    render(){
        return(
            <div>
                <Header/>
                <section className = 'registerForm'>
                    <div className="informationText">
                    <p>회원가입</p>
                    <h4>로그인하면 더 많은 서비스를 이용할수 있습니다</h4>
                    </div>
                    <div className = 'inner'>
                        {this.Itemlist.map((AgentItem,index)=>{
                            return <Printregister pItem={AgentItem.pItem}
                            typeselect={AgentItem.typeselect}
                            placeholderItem={AgentItem.placeholderItem}
                            id = {AgentItem.id}
                            key={index}/>
                        })}
                    </div>
                    <button className="submitid">회원가입</button>
                    <p>이미 계정이 있으신가요?
                        <a href = "/login">로그인</a>
                    </p>
                </section>
            </div>
        )
    }
}
class Printregister extends Component{
    render(){
        return(
            <div>
                <div className ="information">
                    <p>{this.props.pItem}</p>
                    <input type={this.props.typeselect} placeholder={this.props.placeholderItem} onKeyUp={this.Isnum} id={this.props.id}></input>
                </div>
            </div>
        )
    }
    Sendinformation = () =>{
        let IdText = document.getElementById('idText').value;
        let pwdText =  document.getElementById('pwdText').value;
        let RepwdText = document.getElementById('repwdText').value;
        let emailText = document.getElementById('emailText').value;
        let PhoneText = document.getElementById('PhoneNumber').value;
        if(IdText.length < 9){
            alert("아이디는 최소 9글자여야합니다")
            return false;
        }
        if(pwdText.length < 9){
            alert("패스워드는 최소 9글자여야합니다")
            return false;
        }
        if(emailText.length < 10){
            alert("이메일은 최소 10글자여야합니다")
            return false;
        }
        if(PhoneText.length < 4){
            alert("전화번호는 최소 10글자여야합니다")
            return false;
        }
        var RegisterData = {}
        RegisterData.id = IdText
        RegisterData.password = pwdText
        RegisterData.RepwdText = RepwdText
        RegisterData.emailText = emailText
        RegisterData.PhoneText = PhoneText
        console.log(RegisterData)
        
        const sendOptions = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(RegisterData)
        }
        fetch("http://localhost:5000/signup",sendOptions)
        .then(res => res.text())
        .then(printer => alert(printer))
    }
        // 숫자만 입력해야하는지 확인하는 함수
        Isnum = (event) =>{
            // placeholder를 불러오고
            let inputCheck = event.target.placeholder
            // 입력 키 코드 불러온다음
            let _keycode = event.keyCode
            // 불러온게 전화번호 칸일경우
            let PhoneNumvalues = document.getElementById('PhoneNumber').value;
            if(inputCheck === "PhoneNumber"){
                    if((_keycode >=48)&&(_keycode<=57)){
                        let PhoneNum = ""
                        if(PhoneNumvalues.length < 4) {
                            console.log(PhoneNumvalues)
                            return PhoneNumvalues;
                        } else if(PhoneNumvalues.length < 8) {
                            PhoneNum += PhoneNumvalues.substr(0, 3);
                            PhoneNum += "-";
                            PhoneNum += PhoneNumvalues.substr(3);
                        } else if(PhoneNumvalues.length < 11) {
                            PhoneNum += PhoneNumvalues.substr(0, 3);
                            PhoneNum += "-";
                            PhoneNum += PhoneNumvalues.substr(3, 4);
                            PhoneNum += "-";
                            PhoneNum += PhoneNumvalues.substr(7);
                        }
                        else {
                            PhoneNum += PhoneNumvalues.substr(0, 3);
                            PhoneNum += "-";
                            PhoneNum += PhoneNumvalues.substr(3, 4);
                            PhoneNum += "-";
                            PhoneNum += PhoneNumvalues.substr(7);
                        }
                        PhoneNumvalues = PhoneNum;
                        console.log(PhoneNumvalues)
                        return true;
                    }
                    // 아닐경우 이벤트를 멈춰버림
                    else{
                        document.getElementById('PhoneNumber').value = ""
                        return false;
                    }
                }
            }
        }
export default Register