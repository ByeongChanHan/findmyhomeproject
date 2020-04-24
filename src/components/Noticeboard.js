import React,{Component} from 'react';
import Header from '../components/HeaderComponent';
import '../stylesheets/noticePage.css';

class Noticeboard extends Component{
    state = {
        MinimumItems: 0,
        // 처음 아이템 수
        Maxitems: 10,
        // 최대 아이템 수
        isLatest : false
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
        this.setState({
            titleList : writeData.title.slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.slice(this.state.MinimumItems,this.state.Maxitems)
        })
    }
    _getUrlReverse = async () =>{
        const writeData = await this._callData()
        this.setState({
            titleList : writeData.title.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.reverse().slice(this.state.MinimumItems,this.state.Maxitems)
        })
    }
    _scroll = () =>{
        let ST = document.documentElement.scrollTop;
        let SH = document.documentElement.scrollHeight;
        let CH = document.documentElement.clientHeight;
    
        if(ST + CH >= SH){
            setTimeout( () =>{
            this.setState({
                ...this.state.MinimumItems,
                Maxitems : this.state.Maxitems + 10
            })
            this.state.isLatest === false ? this._getUrl() : this._getUrlReverse()
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
    latestList = () =>{
        this._getUrlReverse()
        this.setState({
            ...this.state.Maxitems,
            isLatest : true
        })
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
                        <button className = "selector" onClick={this.latestList}>최신순</button>
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
                            <th>내용</th>
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
                <td>작성자</td>
                <td>{this.props.wrotedate}</td>
                <td>{this.state.Viewnum}</td>
            </tr>
        )
    }
    _viewCounter = () =>{
        this.setState({
            Viewnum : this.state.Viewnum+1
        })
    }
}
export default Noticeboard