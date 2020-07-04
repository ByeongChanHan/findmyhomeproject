import React,{Component} from 'react';
import '../stylesheets/NotoSans.css';
import Descvideo from '../video/mainvideo.mp4'
import '../stylesheets/DescriptionPage.css'
import '../stylesheets/NotoSans.css'

class Description extends Component{
    render(){
        return(
            <section>
            <video className ="mainVideo" preload="auto" autoPlay={true} loop="loop" muted="muted">
            <source src={Descvideo} type="video/mp4"/>
            </video>
            <p className ="DescExplain">
                <b>저희 서비스는 사용자와 중개사 간 의사소통 할수있는 공간을 제공합니다.</b><br></br>
                <button className ="golink"><a href = "/board" className="goBoard">게시판으로 이동</a></button>
            </p>
            </section>
        )
    }
}
export default Description