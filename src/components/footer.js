import React,{Component} from 'react';
import '../stylesheets/footer.css'

class Footer extends Component{
    render(){
        return(
        <footer className="footer">
            <div className="footerDesc">
                <h1>Developer Name</h1>
                <p>Chan Hee Min</p>
                <p>Byoung Chan Han</p>
            </div>
            <div className="footerDesc">
                <h1>I hope our website helps.</h1>
                <p className="copyright"> CopyRight @ FindMyHome. All rights reserved.</p>
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