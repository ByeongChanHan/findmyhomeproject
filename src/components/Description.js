import React,{Component} from 'react';
import '../stylesheets/NotoSans.css';

// componentDidMount(){
//     fetch('http:localhost:5000/')
//     .then(res=>console.log(res.json()))
//     .then(res =>{
//         let _maindataSet = res.json()
//         console.log(_maindataSet)
//         return _maindataSet
//     })
// }

class DescriptionEntire extends Component{
    render(){
        return(
            <section className = "description">
                <h1>공사중</h1>
            </section>
        )
    }
}
export default DescriptionEntire