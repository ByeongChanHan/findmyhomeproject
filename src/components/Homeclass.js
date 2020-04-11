import React,{ Component } from "react";

class Homeclass extends Component{
    render(){
        return(
            <div>
            <button onClick={this._callText}>버튼</button>
            <h1> </h1>
            </div>
        )
    }
    _callText = () => {
        fetch("http://localhost:5000/showclass",{method:'GET'})
        .then(res => res.text())
        .then (text => document.querySelector('h1').innerHTML = text)
    }
}
export default Homeclass