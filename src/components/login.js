import React,{ Component } from "react";

class LoginPage extends Component{
    componentDidMount(){
        console.log("완료");
        fetch("http://localhost:5000/login",{method:'GET'})
        .then(res => res.text())
        .then (text => document.querySelector('h1').innerHTML = text)
    }
    render(){
        return(
            <h1> </h1>
        )
    }
}
export default LoginPage