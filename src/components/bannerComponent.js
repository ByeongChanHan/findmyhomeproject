import React,{Component} from 'react';
import '../stylesheets/PacificoFont.css';
import home from'../images/home.png';
import location from'../images/location.png';
import trust from'../images/trust.png';

class Banner extends Component{
    // 이미지와 영어 설명란
    imgList = [
        {
            icon : home,
            explain : "Our services ensure the trust of the home."
        },
        {
            icon : location,
            explain : "Find the location you want."
        },
        {
            icon : trust,
            explain : "Prove authorized real estate agent"
        }
    ]
    render() {
        // 위에있는 imgList배열을 map함수 돌려서 한꺼번에 3개 return
        // posterIcon은 imgList하고 값이 똑같음
        return(
        this.imgList.map((posterIcon,index)=>{
            return <Advantage poster={posterIcon.icon}
             name="advantage"
            description={posterIcon.explain}
            key={index}/>
        })
        )
    }
}
class Advantage extends Component{
    // 이미지와 글씨태그 html 출력부분
    // 위에 poster name description이 다 속성값(props)임
    render() {
        return(
            <div className = {this.props.name}>
                <img src = {this.props.poster} alt="icon"></img><br></br>
                <b>{this.props.description}</b>
            </div>
        )
    }
}
export default Banner