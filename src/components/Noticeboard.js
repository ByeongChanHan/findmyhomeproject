import React,{Component} from 'react';
import Header from '../components/HeaderComponent';
import '../stylesheets/noticePage.css';
import '../stylesheets/NotoSans.css'

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
            let _dataSet = res.json()
            return _dataSet
        })
    }
    // 동기함수 _getUrl
    _getUrl = async () =>{
        // _callData를 호출하면 writeData변수에 저장됨
        const writeData = await this._callData()
        // slice로 키값(title,userwrote,wrotedate)를 잘라주고 state에 저장
        this.setState({
            // 전체데이터에서 쪼갠데이터들을 저장 0부터 10까지
            listnum : writeData.listnum.slice(this.state.MinimumItems,this.state.Maxitems),
            titleList : writeData.title.slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.slice(this.state.MinimumItems,this.state.Maxitems),
            viewnum : writeData.viewnum.slice(this.state.MinimumItems,this.state.Maxitems),
            writeid : writeData.writeid.slice(this.state.MinimumItems,this.state.Maxitems),
            // 전체 조회수
            savedviewnum : writeData.viewnum,
            // 총 몇건인지 나타내기위함
            totalNum : writeData.title.length,
            // 제목 전체 데이터
            titleTotal : writeData.title,
            // 내용 전체 데이터
            userwroteTotal : writeData.userwrote,
            // 작성날짜 전체 데이터
            wrotedateTotal : writeData.wrotedate,
            // 글번호
            totallistnum : writeData.listnum,
            // 글쓴 아이디들
            totalwriteid : writeData.writeid
        })
    }
    // 최신데이터가 맨 밑에 출력되는것을 고려해서 최신순누르면 기존배열의 역순으로 자름
    _getUrlReverse = async () =>{
        const writeData = await this._callData()
        this.setState({
            // 거꾸로 한다음 자른것들
            titleList : writeData.title.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            userwroteList : writeData.userwrote.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            wrotedate : writeData.wrotedate.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            viewnum : writeData.viewnum.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            writeid : writeData.writeid.reverse().slice(this.state.MinimumItems,this.state.Maxitems),
            listnum : writeData.listnum.reverse().slice(this.state.MinimumItems,this.state.Maxitems)
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
                // 0개부터 최대치가 10이였는데 거기서 10개를 더 늘린다
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
            num={this.state.listnum[index]}
            wrotedate={this.state.wrotedate[index]}
            viewnum={this.state.viewnum[index]}
            writeid={this.state.writeid[index]}
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
                        <input type="text" className="searchText" onKeyPress={this._enter} onChange={this.onChange}></input>
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
    // keypress 엔터눌렀을때 charcode가 13으로 나옴
    _enter = (event) =>{
        if(event.charCode === 13){
            this.ClickToggle()
        }
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
            var Searchresult = []
            for(var index = 0; index<this.state.titleTotal.length; index++){
                // 전체 제목을 불러오고
                var Titledata = this.state.titleTotal
                // 0번째 부터 끝까지 검색한 단어가 있는지 검사
                // 찾으면 해당단어가 나오는 인덱스를 반환 못찾을경우 -1을 리턴
                var compareData = Titledata[index].indexOf(searchText)
                // 배열에다가 push해서 -1과 상관없이 넣어준다
                Searchresult.push(compareData)
            }
            const Searchrender = Searchresult.map((result,index)=>{
                // result라는 배열은 Searchresult 배열과 같음
                // 만약 result배열이 [-1,-1,0,3,-1,-1] 이런식으로 있을때
                // -1이아니면 찾은거나 마찬가지여서 -1이 아닐경우 현재 루프 돌고있는 index의값을 출력한다
                if(result !== -1){
                    return <WriteList title={this.state.titleTotal[index]}
                    userwrote={this.state.userwroteTotal[index]}
                    num={this.state.totallistnum[index]}
                    wrotedate={this.state.wrotedateTotal[index]}
                    viewnum = {this.state.savedviewnum[index]}
                    writeid = {this.state.totalwriteid[index]}
                    key={index}/>
                }
                // es6 에로우함수(=>) 는 리턴값이 있어야함
                return ''
            })
            return Searchrender
        }
        // 내용을 선택했을때(위에 로직이랑 동일)
        else if(this.state.SelectedOption === "userwrote"){
            var wroteresult = []
            for(var idx = 0; idx<this.state.userwroteTotal.length; idx++){
                var wrotelistdata = this.state.userwroteTotal
                var comparewroteData = wrotelistdata[idx].indexOf(searchText)
                wroteresult.push(comparewroteData)
            }
            const wroterender = wroteresult.map((resultarr,index)=>{
                if(resultarr !== -1){
                    return <WriteList title={this.state.titleTotal[index]}
                    userwrote={this.state.userwroteTotal[index]}
                    num={this.state.totallistnum[index]}
                    wrotedate={this.state.wrotedateTotal[index]}
                    viewnum = {this.state.savedviewnum[index]}
                    writeid = {this.state.totalwriteid[index]}
                    key={index}/>
                }
                return ''
            })
            return wroterender
        }
    }
}
// tbody내용을 표시해주는 클래스
class WriteList extends Component{
    // 누를때마다 viewCounter호출
    // 하나의 열은 위에서 return한 WriteList 클래스 각각의 속성값
    // 작성자는 회원가입기능 완료후 수정예정
    componentDidMount(){
        var Row_id = this.props.num;
        document.getElementById(Row_id).addEventListener('click',this._viewCounter)
    }
    render(){
        return(
            <tr id = {this.props.num}>
                <td>{this.props.num}</td>
                <td>{this.props.title}</td>
                <td>{this.props.userwrote}</td>
                <td>{this.props.writeid}</td>
                <td>{this.props.wrotedate}</td>
                <td>{this.props.viewnum}</td>
            </tr>
        )
    }
    // 클릭할때마다 조회수 증가
    _viewCounter = () =>{
        // 로그인 되지 않았을때
        if(document.getElementById("idtext")===null){
            alert("로그인 후 이용해주세요")
            // 로그인페이지로 이동하게끔 하고
            window.location.href ="/login"
            // false리턴해서 빠져나간다
            return false
        }
        // 조회수를 클릭하면 1씩 늘려서 그 값을 서버에 전달
        var CurrentviewNum = this.props.viewnum+1
        var SelectedObject = {}
        SelectedObject.currentnum = CurrentviewNum;
        // 글번호를 request로 보내는 이유 : 서버에있는 /board/<numurl>부분에서 받으려고 하기 위함
        SelectedObject.listnum = this.props.num;
        const ClickSave = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(SelectedObject)
        }
        fetch("http://localhost:5000/board",ClickSave)
        .then(showList => console.log(showList.text()))
        // 조회수가 저장되는 시간을 고려해서 1초 후에 페이지가 넘어감
        // 페이지는 board 뒤에 글번호를 붙여서 이동
        setTimeout(()=>{
            window.location.href = `http://localhost:3000/board/${this.props.num}`
        },1000)
    }
}
export default Noticeboard