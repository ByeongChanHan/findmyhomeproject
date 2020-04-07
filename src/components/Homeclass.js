import React,{ Component } from "react";

class Homeclass extends Component{
    componentDidMount(){
        console.log("완료");
        fetch("http://localhost:5000/showclass",{method:'GET'})
        .then(res => res.text())
        .then (text => document.querySelector('h1').innerHTML = text)
    }
    render(){
        return(
            <h1>클래스 페이지 입니다.</h1>
        )
    }
}
export default Homeclass