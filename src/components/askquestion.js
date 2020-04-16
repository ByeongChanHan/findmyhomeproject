import React,{Component} from 'react';
import "../stylesheets/askDesign.css";
import Header from "../components/HeaderComponent";

class Askquestion extends Component{
    render(){
        return(
            <div className ="askcontainer">
            <Header/>
            <select className = "select">
                <option selected>지역선택</option>
                <option>서울</option>
                <option>인천</option>
                <option>경기</option>
            </select>
            <select className = "select">
                <option selected>옵션</option>
                <option>월세</option>
                <option>전세</option>
                <option>매매</option>
                <option>복층</option>
                <option>원룸</option>
                <option>투룸</option>
            </select>
            <br></br>
            <textarea type="text" id ="textarea"></textarea><br></br>
            <button className = "askBtn">
            <a href = "/board" onClick={this._sendText}>질문하기</a>
            </button>
            </div>
        )
    }
    _sendText = () => {
        fetch("http://localhost:5000/ask",{method:'POST'})
        .then(res => res.text())
        .then (text => document.querySelector('h1').innerHTML = text)
    }
}
export default Askquestion