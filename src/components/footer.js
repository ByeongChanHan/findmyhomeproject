import React,{Component} from 'react';

class Footer extends Component{
    render(){
        // footer의 스타일 설정
        const FooterDescStyle={
            fontSize:'30px',
            top:'70px',
            position:'relative'
        }
        const CopyRightStyle={
            position:'relative',
            top:'110px',
            margin:0
        }
        return(
        <footer className="footer">
            <div className="footerDesc">
                <h1>Developer Name</h1>
                <p>Chan Hee Min</p>
                <p>Byoung Chan Han</p>
            </div>
            <div className="footerDesc">
                {/* 위에있는 스타일 적용 */}
                <b style={FooterDescStyle}>I hope our website helps.</b>
                <p style={CopyRightStyle}> CopyRight @ FindMyHome. All rights reserved.</p>
            </div>
            <div className="footerDesc">
                <h1>contact email</h1>
                <p>mch8023@gmail.com</p>
                <p>gks5927@gmail.com</p>
            </div>
        </footer>
        )
    }
}
export default Footer