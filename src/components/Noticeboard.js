import React,{Component} from 'react';
import Header from '../components/HeaderComponent';
import '../stylesheets/noticePage.css';

class Noticeboard extends Component{
    // 페이지의 상태값
    state = {
        // 처음 아이템 수
        MinimumItems: 0,
        // 최대 아이템 수
        Maxitems: 10,
        // 최신순 버튼 클릭 여부
        isLatest : false,
        // 검색 버튼 클릭 여부
        SearchToggle : false,
        // 기본선택값은 제목임
        SelectedOption : "title"
    }

    // 이 메소드는 페이지가 렌더링이 다될때 실행
    componentDidMount(){
        // _getUrl은 _callData에서 불러온값을 가지고 새로운 state값을 설정해줌
        // 불러온값은 전체배열에서 10개 자른 데이터와 전체 데이터들
        this._getUrl()
        // 스크롤 이벤트를 기다리면서 스크롤발생하면 this._scroll이 호출됨
        window.addEventListener('scroll',this._scroll,true)
    }

    // db포트 5000번에있는 board파라미터를 return해주는 함수
    _callData = () =>{
        return fetch('http://localhost:5000/board')
        // fetch에서 불러온데이터를 res(임의로 정한 변수)에 받고
        // json으로 변환
        .then(res=>{
            console.log(res)
            let _dataSet = res.json()
            console.log(_dataSet)
            return _dataSet
        })
    }
    // 동기함수 _getUrl
    _getUrl = async () =>{
        // _callData를 호출하면 writeData변수에 저장됨
        const writeData = await this._callData()
        // slice로 키값(title,userwrote,wrotedate)를 잘라주고 state에 저장
        this.setState({
            titleList : writeData.title.slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.slice(this.state.MinimumItems,this.state.Maxitems),
            totalNum : writeData.title.length,
            titleTotal : writeData.title,
            userwroteTotal : writeData.userwrote,
            wrotedateTotal : writeData.wrotedate
        })
        console.log(this.state)
    }
    // 최신데이터가 맨 밑에 출력되는것을 고려해서 최신순누르면 기존배열의 역순으로 자름
    _getUrlReverse = async () =>{
        const writeData = await this._callData()
        this.setState({
            titleList : writeData.title.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.reverse().slice(this.state.MinimumItems,this.state.Maxitems)
        })
    }
    // 스크롤했을때 작용하는 메소드
    _scroll = () =>{
        // 스크롤 탑은 전체페이지중 사용자가 보는 뷰를 제외한 가려진 부분
        let _ScrollTop = document.documentElement.scrollTop;
        // 클라이언트 높이는 전체페이지중 사용자가보는뷰의 높이
        let _ClientHeight = document.documentElement.clientHeight;
        // 스크롤 높이는 전체페이지의 높이
        let _ScrollHeight = document.documentElement.scrollHeight;
    
        // 만약 가려진부분과 사용자가 보는 뷰를 합했을때 전체페이지의 높이라면
        // 스크롤이 맨 밑으로 내려가있는 상태
        if(_ScrollTop + _ClientHeight >= _ScrollHeight){
            // setTimeout으로 1초후 실행
            // state의 최소 데이터의 길이는 0인 그대로지만 최대 데이터의 길이는 10증가
            setTimeout( () =>{
            this.setState({
                ...this.state.MinimumItems,
                Maxitems : this.state.Maxitems + 10
            })
            // 최신순이 비활성화 되있으면 기존에있는 _getUrl을 호출
            // 버튼을 누르면 isLatest가 true가 되면서 _getUrlReverse가 호출됨
            this.state.isLatest === false ? this._getUrl() : this._getUrlReverse()
            },1000)
        }
    }
    // 실질적으로 렌더링하는 함수
    _renderList = () => {
        // titleList를 처음에 먼저불러오기때문에 그 데이터를 map함수 돌림
        // 여기서 titleList하고 listarr은 똑같은 값임
        // index는 map이 동작하면서 for문처럼 1씩 올라감
        const renderingList = this.state.titleList.map((listarr,index)=>{
            // return 할것은 title이라는 속성에 listarr은 this.state.titleList랑 같음
            // 10개씩 쪼갠 배열이있으면 index는 계속 증가하니까 index를 배열 인덱스에 넣어주면
            // 10개가 전원출력이 됨
            return <WriteList title={listarr}
            userwrote={this.state.userwroteList[index]}
            num={index+1}
            wrotedate={this.state.wrotedate[index]}
            key={index}/>
            // 렌더링 리스트의 배열을 매핑하면서 인덱스 값이 증가하는데
            // 증가할때 userwroteList의 배열과 일치하는것
        })
        return renderingList
    }
    // 최신순 클릭했을때 작용하는함수
    // lslatest를 true로 만들어서 _getUrlReverse를 호출함
    latestList = () =>{
        this._getUrlReverse()
        this.setState({
            ...this.state.Maxitems,
            isLatest : true
        })
    }
    // html에 렌더링할 코드
    render(){
        return(
            <div>
                <Header/>
                {/* 이미지 섹션 */}
                <section className = "notice">
                <h1>게시판</h1>
                </section>
                {/* 게시판 섹션 */}
                <div className="boardsearchArea">
                    <p className="allnum">총 {this.state.totalNum}건</p>
                    <div className="boardform">
                        {/* 최신순 버튼 */}
                        <button className = "selector" onClick={this.latestList}>최신순</button>
                        {/* 제목,내용순*/}
                        <select className = "selector" onChange={this.onChangeOption}>
                            <option value="title">제목</option>
                            <option value="userwrote">내용</option>
                        </select>
                        {/* 검색단어 입력하는 input부분 */}
                        <input type="text" className="searchText" onChange={this.onChange}></input>
                        {/* 검색 버튼 */}
                        <input type="button" value="검색" className="searchBtn" onClick={this.ClickToggle}></input>
                    </div>
                </div>
                {/* 수평선 */}
                <hr></hr>
                {/* 테이블 섹션 */}
                <table className="boardtable">
                    {/* 위에 있는 thead부분 */}
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
                    {/* 게시판 내용을 표시하는 tbody부분 */}
                    <tbody>
                    {this.state.titleList ? this._tablePrint() :"로딩중"}
                    </tbody>
                </table>
            </div>
        )
    }
    // 테이블을 어떤걸 보여줄지 결정하는 함수
    // 검색을 안누르면 false니까 전체데이터 10개씩 쪼갠거 출력
    // 검색을 누르면 _search함수 호출
    _tablePrint = () =>{
        if(this.state.SearchToggle === false){
            return this._renderList()
        }
        else if(this.state.SearchToggle === true){
            return this._Search()
        }
    }
    // 검색 단어 입력창에 단어를 입력할때마다 함수가 실행
    // 이벤트를 받는 e변수에 있는 target.value하면 입력한 값을 받아줌 그것을 state에 저장시킴
    onChange = (e) =>{
        this.setState({
            Searchvalue : e.target.value
        })
    }
    // 제목,내용이라는 텍스트 받아오는함수(위와 동일한 로직)
    onChangeOption = (e) =>{
        console.log(e.target.value)
        this.setState({
            SelectedOption : e.target.value
        })
    }
    // 검색버튼을 누르면 SearchToggle이 true로 변환
    ClickToggle = ()=>{
        this.setState({
            ...this.state.latestList,
            SearchToggle : true
        })
    }
    _Search = () =>{
        // 검색 텍스트 불러오기
        let searchText = this.state.Searchvalue
        //제목을 선택했을때 titleTotal(제목 전체 데이터)를 state에서 불러와서 for문으로 검사
        if(this.state.SelectedOption === "title"){
            for(var index = 0; index<=this.state.titleTotal.length; index++){
                // index는 1씩 늘어나고있으니까 전체데이터를 하나씩 다 뒤져서 
                // 아까 state에 저장한 검색값(Searchvalue)랑 같으면 해당하는 index를 return
                if(this.state.titleTotal[index] ===searchText){
                    return <WriteList title={this.state.titleTotal[index]}
                    userwrote={this.state.userwroteTotal[index]}
                    num={index+1}
                    wrotedate={this.state.wrotedateTotal[index]}
                    key={index}/>
                }
                // 없을경우 continue로 for문을 계속 실행해줌
                else{
                    continue;
                }
            }
        }
        // 내용을 선택했을때(위에 로직이랑 동일)
        else if(this.state.SelectedOption === "userwrote"){
            for(var idx = 0; idx<=this.state.userwroteTotal.length; idx++){
                if(this.state.userwroteTotal[idx] ===searchText){
                    return <WriteList title={this.state.titleTotal[idx]}
                    userwrote={this.state.userwroteTotal[idx]}
                    num={idx+1}
                    wrotedate={this.state.wrotedateTotal[idx]}
                    key={idx}/>
                }
                else{
                    continue;
                }
            }
        }
    }
}
// tbody내용을 표시해주는 클래스
class WriteList extends Component{
    // 조회수 Viewnum
    state = {
        Viewnum: 0
    }
    // 누를때마다 viewCounter호출
    // 하나의 열은 위에서 return한 WriteList 클래스 각각의 속성값
    // 작성자는 회원가입기능 완료후 수정예정
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
    // viewnum을 1증가시킴(수정예정)
    _viewCounter = () =>{
        this.setState({
            Viewnum : this.state.Viewnum+1
        })
    }
}
export default Noticeboard