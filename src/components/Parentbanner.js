import React,{Component} from 'react';
import Banner from './bannerComponent';
import '../stylesheets/NotoSans.css';

class Parentbanner extends Component{
    render(){
        return(
            <section className = "banner">
            <div className="SiteExplain">
            이젠 허위매물에 속지 말고<br></br>
            검증된 중개사에게 추천받아요!<br></br>
            <section className= "details">
                <Banner/>
            </section>
            <br></br>
                <a href = "/ask" id = "startid">
                    중개사에게 질문하기
                </a>
            </div>
            </section>
        )
    }
}
export default Parentbanner