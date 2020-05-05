import React,{Component} from 'react';
import Header from './HeaderComponent'
import '../stylesheets/agentRegister.css'
import '../stylesheets/NotoSans.css'

class Agentregister extends Component{
    Itemlist =[
        {
        pItem : '아이디',
        placeholderItem: 'ID',
        typeselect: 'text'
        },
        {
        pItem : '비밀번호',
        placeholderItem: 'Password',
        typeselect: 'password'
        },
        {
        pItem : '비밀번호 재입력',
        placeholderItem: 'Re-Password',
        typeselect: 'password'
        },
        {
        pItem : '이메일',
        placeholderItem: 'Email',
        typeselect: 'email'
        },
        {
        pItem : '중개사번호',
        placeholderItem: 'Agentnumber',
        typeselect: 'text'
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
                            return <RegisterItem pItem={AgentItem.pItem}
                            typeselect={AgentItem.typeselect}
                            placeholderItem={AgentItem.placeholderItem}
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
class RegisterItem extends Component{
    render(){
        return(
            <div>
                <div className ="information">
                    <p>{this.props.pItem}</p>
                    <input type={this.props.typeselect} placeholder={this.props.placeholderItem}></input>
                </div>
            </div>
        )
    }
}
export default Agentregister