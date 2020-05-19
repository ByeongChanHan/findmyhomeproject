import React,{Component} from 'react';
import Header from './HeaderComponent'
import '../stylesheets/agentRegister.css'
import '../stylesheets/NotoSans.css'

class Agentregister extends Component{
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
        pItem : '중개사번호',
        placeholderItem: 'Agentnumber',
        typeselect: 'text',
        id : 'AgentText'
        }
    ]
    render(){
        return(
            <div>
                <Header/>
                <section className = 'registerForm'>
                    <div className="informationText">
                    <p>중개사 회원가입</p>
                    <h4>로그인하면 더 많은 서비스를 이용할수 있습니다</h4>
                    </div>
                    <div className = 'inner'>
                        {this.Itemlist.map((AgentItem,index)=>{
                            return <RegisterItem pItem={AgentItem.pItem}
                            typeselect={AgentItem.typeselect}
                            placeholderItem={AgentItem.placeholderItem}
                            id = {AgentItem.id}
                            key={index}/>
                        })}
                    </div>
                    <input type="button" className="submitid" onClick={this.Sendinformation} value="회원가입"></input>
                    <p>이미 계정이 있으신가요?
                        <a href = "/login">로그인</a>
                    </p>
                </section>
            </div>
        )
    }
    Sendinformation = () =>{
        let IdText = document.getElementById('idText').value;
        let pwdText =  document.getElementById('pwdText').value;
        let RepwdText = document.getElementById('repwdText').value;
        let emailText = document.getElementById('emailText').value;
        let AgentText = document.getElementById('AgentText').value;
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
        if(AgentText.length < 4){
            alert("중개사번호는 최소 4글자여야합니다")
            return false;
        }
        var RegisterData = {}
        RegisterData.id = IdText
        RegisterData.password = pwdText
        RegisterData.RepwdText = RepwdText
        RegisterData.emailText = emailText
        RegisterData.AgentText = AgentText
        console.log(RegisterData)
        
        const sendOptions = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(RegisterData)
        }
        fetch("http://localhost:5000/signupagent",sendOptions)
        .then(res => res.text())
        .then(printer => alert(printer))
    }
}
class RegisterItem extends Component{
    render(){
        return(
            <div>
                <div className ="information">
                    <p>{this.props.pItem}</p>
                    <input type={this.props.typeselect} placeholder={this.props.placeholderItem} onKeyPress={this.Isnum} id={this.props.id}></input>
                </div>
            </div>
        )
    }
    // 숫자만 입력해야하는지 확인하는 함수
    Isnum = (event) =>{
        // placeholder를 불러오고
        let inputCheck = event.target.placeholder;
        // 입력 키 코드 불러온다음
        let _keycode = event.which;
        // 불러온게 중개사 번호 칸일경우
        console.log(_keycode)
        if(inputCheck === "Agentnumber"){
            // 48~57범위가 숫자로 나옴
            if((_keycode >=48)&&(_keycode<=57)){
                return true;
            }
            // 아닐경우 이벤트를 멈춰버림
            else{
                event.preventDefault();
                return false;
            }
        }
    }
}
export default Agentregister