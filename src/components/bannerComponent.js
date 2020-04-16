import React,{Component} from 'react';
import '../stylesheets/PacificoFont.css';
import home from'../images/home.png';
import location from'../images/location.png';
import trust from'../images/trust.png';

class Banner extends Component{
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