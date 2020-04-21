import React,{Component} from 'react';
import Header from '../components/HeaderComponent';
import '../stylesheets/noticePage.css';

class Noticeboard extends Component{
    state = {
        MinimumItems: 0,
        // 처음 아이템 수
        Maxitems: 10
        // 최대 아이템 수
    }
    componentDidMount(){
        this._getUrl()
        window.addEventListener('scroll',this._scroll,true)
    }
    _callData = () =>{
        return fetch('http://localhost:5000/board')
        .then(res=>{
            console.log(res)
            let _dataSet = res.json()
            console.log(_dataSet)
            return _dataSet
        })
    }
    _getUrl = async () =>{
        const writeData = await this._callData()
        console.log(writeData);
        this.setState({
            titleList : writeData.title.slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.slice(this.state.MinimumItems,this.state.Maxitems)
        })
        console.log(this.state)
    }
    _scroll = () =>{
        let ST = document.documentElement.scrollTop;
        let SH = document.documentElement.scrollHeight;
        let CH = document.documentElement.clientHeight;
    
        if(ST + CH === SH){
            setTimeout( () =>{
            this.setState({
                ...this.state.MinimumItems,
                Maxitems : this.state.Maxitems + 10
            })
            this._getUrl()
            },1000)
        }
    }
    _renderList = () => {
        const renderingList = this.state.titleList.map((listarr,index)=>{
            console.log(listarr)
            return <WriteList title={listarr}
            userwrote={this.state.userwroteList[index]}
            num={index+1}
            wrotedate={this.state.wrotedate[index]}
            key={index}/>
            // 렌더링 리스트의 배열을 매핑하면서 인덱스 값이 증가하는데
            // 증가할때 userwroteList의 배열과 일치하는것
        })
        console.log(renderingList)
        return renderingList
    }
    render(){
        return(
            <div>
                <Header/>
                <section className = "notice">
                <h1>게시판</h1>
                </section>
                {/* 이미지 섹션 */}
                <div className="boardsearchArea">
                    <p className="allnum">총 {document.getElementsByTagName('tr').length-1}건</p>
                    {/* 수정요망 */}
                    <div className="boardform">
                        <select className = "selector">
                            <option value='default'>제목</option>
                            <option>내용</option>
                        </select>
                    {/* form 수정예정 */}
                        <input type="text" className="searchText"></input>
                        <input type="submit" value="검색" className="searchBtn"></input>
                    </div>
                </div>
                <hr></hr>
                {/* 검색 폼과 수평선까지 */}
                <table className="boardtable">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.titleList ? this._renderList() :"로딩중"}
                    </tbody>
                </table>
            </div>
        )
    }
}
class WriteList extends Component{
    state = {
        Viewnum: 0
    }
    render(){
        return(
            <tr>
                <td>{this.props.num}</td>
                <td><button onClick={this._viewCounter}>{this.props.title}</button></td>
                <td>{this.props.userwrote}</td>
                <td>{this.props.wrotedate}</td>
                <td>{this.state.Viewnum}</td>
            </tr>
        )
    }
    _viewCounter = () =>{
        this._savenumRequest()
        this.setState({
            Viewnum : this.state.Viewnum+1
        })
    }
    _savenumRequest = () =>{
        let savenum = this.state.Viewnum+1
        var savejsonify ={}
        savejsonify.savenum = savenum
        const reqOptions = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(savejsonify)
        }
        fetch('http:localhost:5000/board',reqOptions)
        .then(res => console.log(res.text()))
    }
}
export default Noticeboard

// _renderList = () => {
//     const renderingList = this.state.showlist.map((listarr,index)=>{
//         return <WriteList title={listarr.title} userwrote={listarr.userwrote} key={index}/>
//     })
//     return renderingList
// }
// render(){
//     return(
        // <div>
        //     {this.state.showlist ? this._renderList() :"로딩중"}
        // </div>
//     )
// }

// 무한 스크롤 기능
// state = {
//     MinimumItems: 0,
//     // 처음 아이템 수
//     Maxitems:1
//     // 최대 아이템 수
// }
// // 스타일
// componentDidMount(){
//     this._getUrl()
//     window.addEventListener('scroll',this._scroll,true)
// }
// // 페이지 다 불러오면 getUrl 함수호출

// _getUrl = async () =>{
//     const writeData = await this._callData()
//     console.log(writeData);
//     this.setState({
//         showlist : writeData
//     })
// }
// // getUrl은 calldata함수 리턴값을 poster함수에 저장 후 state에 showurl을 생성, 리턴값을 showurl에 저장

// _callData = () =>{
//     return axios.get('http:localhost:5000/board')
//     .then((response)=>{
//         let showData = response.data.slice(this.state.MinimumItems,this.state.Maxitems)
//         console.log(showData)
//         return showData;
//     })
// }
// // 해당 주소를 axios로 호출후 요청 받은 값 response의 데이터를 0~20까지 쪼개고 리턴
// _scroll = () =>{
//     let ST = document.documentElement.scrollTop;
//     let SH = document.documentElement.scrollHeight;
//     let CH = document.documentElement.clientHeight;

//     if(ST + CH === SH){
//         setTimeout( () =>{
//         this.setState({
//             ...this.state.MinimumItems,
//             Maxitems : this.state.Maxitems + 2
//         })
//         this._getUrl()
//         },1000)
//     }
// }
// // 스크롤 탑은 위에 가려진구역
// // 스크롤 하이트는 전체 페이지 높이
// // 클라이언트 하이트는 보여지는 페이지높이
// // 가려진구역 높이+보여지는 페이지높이 = 전체 페이지 높이일경우 아이템 최대치를 20만큼 증가후 다시 요청을 보내는식
// _renderList = () => {
//     const poster = this.state.showlist.map((listarr)=>{
//         return <Noticeboard poster={listarr.download_url} title={listarr.author} posterstyle={this.posterstyle} key={showposter.id}/>
//     })
//     return poster
// }
// render(){
//     return(
//         <div>
//             {this.state.showlist ? this._renderList() :"로딩중"}
//         </div>
//     )
// }
// }
// class WriteList extends Component{
// render(){
//     return(
//         <div className = "poster">
//         <section>
//         <img src = {this.props.poster} style={this.props.posterstyle} alt="poster"></img>
//         <h1>{this.props.title}</h1>
//         </section>
//         </div>
//     )
// }