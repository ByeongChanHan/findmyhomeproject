import React,{Component} from 'react';
import axios from "axios"
import '../stylesheets/askDesign.css'

class Noticeboard extends Component{
state = {
        MinimumItems: 0,
        // 처음 아이템 수
        Maxitems:20
        // 최대 아이템 수
    }
    posterstyle = {
        width : "300px",
        height : "300px"
    }
    // 스타일
    componentDidMount(){
        this._getUrl()
        window.addEventListener('scroll',this._scroll,true)
    }
    // 페이지 다 불러오면 getUrl 함수호출
    
    _getUrl = async () =>{
        const poster = await this._callData()
        console.log(poster);
        this.setState({
             showurl : poster
        })
    }
    // getUrl은 calldata함수 리턴값을 poster함수에 저장 후 state에 showurl을 생성, 리턴값을 showurl에 저장
    
    _callData = () =>{
        return axios.get('https://picsum.photos/v2/list?page=2&limit=100')
        .then((response)=>{
            let showData = response.data.slice(this.state.MinimumItems,this.state.Maxitems)
            console.log(showData)
            return showData;
        })
    }
    // 해당 주소를 axios로 호출후 요청 받은 값 response의 데이터를 0~20까지 쪼개고 리턴
    _scroll = () =>{
        let ST = document.documentElement.scrollTop;
        let SH = document.documentElement.scrollHeight;
        let CH = document.documentElement.clientHeight;
    
        if(ST + CH === SH){
            setTimeout( () =>{
            this.setState({
                ...this.state.MinimumItems,
                Maxitems : this.state.Maxitems + 20
            })
            this._getUrl()
            },1000)
        }
    }
    // 스크롤 탑은 위에 가려진구역
    // 스크롤 하이트는 전체 페이지 높이
    // 클라이언트 하이트는 보여지는 페이지높이
    // 가려진구역 높이+보여지는 페이지높이 = 전체 페이지 높이일경우 아이템 최대치를 20만큼 증가후 다시 요청을 보내는식
    _renderImg = () => {
        const poster = this.state.showurl.map((showposter)=>{
            return <WriteList poster={showposter.download_url} title={showposter.author} posterstyle={this.posterstyle} key={showposter.id}/>
        })
        return poster
    }
    render(){
        return(
            <div>
                {this.state.showurl ? this._renderImg() :"로딩중"}
            </div>
        )
    }
}
class WriteList extends Component{
    render(){
        return(
            <div className = "poster">
            <section>
            <img src = {this.props.poster} style={this.props.posterstyle} alt="poster"></img>
            <h1>{this.props.title}</h1>
            </section>
            </div>
        )
    }
}
export default Noticeboard