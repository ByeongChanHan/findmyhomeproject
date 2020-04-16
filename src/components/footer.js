import React,{Component} from 'react';

class Footer extends Component{
    render(){
        const FooterDescStyle={
            fontSize:'30px',
            top:'70px',
            position:'relative'
        }
        const CopyRightStyle={
            position:'relative',
            top:'110px'
        }
        return(
        <footer className="footer">
            <div className="footerDesc">
                <h1>Developer Name</h1>
                <p>Chan Hee Min</p>
                <p>Byoung Chan Han</p>
            </div>
            <div className="footerDesc">
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