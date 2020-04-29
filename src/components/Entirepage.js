import React,{Component} from 'react';
import Header from './HeaderComponent';
import Parentbanner from './Parentbanner';
import Description from './Description';
import Footer from './footer'

class Entirepage extends Component{
    // 메인페이지 전체 구성
    render(){
        return(
            <div>
                <Header/>
                <Parentbanner/>
                <Description/>
                <Footer/>
            </div>
        )
    }
}
export default Entirepage