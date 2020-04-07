import React,{Component} from 'react';
import Header from './HeaderComponent';
import Parentbanner from './Parentbanner';
import DescriptionEntire from './Description';
import Footer from './footer'

class Entirepage extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Parentbanner/>
                <DescriptionEntire/>
                <Footer/>
            </div>
        )
    }
}
export default Entirepage