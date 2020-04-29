import React,{Component} from 'react';
import broker from '../images/broker.png'
import normal from '../images/normal.png'
import '../stylesheets/devision.css'
import '../stylesheets/NotoSans.css';

class CreateAccount extends Component{
    // 일반회원 중개사 구별 페이지
    render(){
        return(
            <div>
            <div className="member_register_wrap">
                <p className="ex_text">
                    <strong>일반회원/중개사 </strong>
                    종류에 따라 회원가입 절차가 다릅니다.<br/>
                    고객님이 해당하는 회원 종류를 선택해주세요.
                </p>
                <div className="align">
                    <a href="/register2">
                    <div className="member_register_basic">
                        <p>
                            <img src={normal} alt="일반 회원"></img>
                        </p>
                        <p className="bt_text">일반 회원</p>
                    </div>
                    </a>
                    <a href="/register">
                        <div className="member_register_dealer">
                            <p>
                                <img src={broker}  alt="중개사"></img>
                            </p>
                        <p className="bt_text">중개사</p>
                        </div>
                    </a>
                </div>
            </div>
            </div>
        )
    }
}
export default CreateAccount