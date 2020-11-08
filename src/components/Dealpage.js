/*global kakao*/
import React,{Component, Fragment} from "react"
import Header from "./HeaderComponent"
import '../stylesheets/Dealpage.css'
import '../stylesheets/RobotoFont.css';

class Dealpage extends Component{
    state = {

    }
    // 페이지 로드했을때 지도를 보여주고
    componentDidMount(){
        this.mapRender();
    }
    mapRender = () =>{
        let container = document.getElementById('map');
		let map = new kakao.maps.Map(container,{
            center: new kakao.maps.LatLng(37.566698, 126.979122),
            level:3
        })
        map.relayout();
    }
    // 지역검색 호출함수
    AreaSearch = () =>{
        let dongValue = document.getElementById("dongselect");
        let selectedValue = dongValue.options[document.getElementById("dongselect").selectedIndex].value;
        var searchvalue = {}
        searchvalue.dongValue = selectedValue;
        const requestOptions = {
            method:'POST',
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            },
            body : JSON.stringify(searchvalue)
        }
        return fetch("/deal",requestOptions)
        .then(res => res.json())
        .then(response => {
            this.setState({
                fulladdressname : response.fulladdress,
                price : response.price,
                buildyear : response.buildyear,
                apartname : response.apartname,
                area : response.area,
                floor : response.floor,
                monthday : response.monthday
            })
            let _data = this.state
            this.ShowArea(_data)
        })
    }
    // 장소 검색 호출 함수
    AddressSearch = () =>{
        let searchText = document.getElementById("Addressinput").value;
        // this.ShowArea(searchText)
    }
    // 주소를 받는 ShowArea메소드
    ShowArea = (address) =>{
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        // 처음 맵이 뜰때 위치 설정
        let container = document.getElementById('map');
		let map = new kakao.maps.Map(container,{
            center: new kakao.maps.LatLng(37.566698, 126.979122),
            level:3
        })
        // 레벨을 가져와서
        var level = map.getLevel();
        // 2단계 당겨준다(더 넓은 범위로 볼수 있게끔)
        map.setLevel(level + 2);
        map.relayout();
        // 장소 검색 할 수 있는 geocoder
        var geocoder = new kakao.maps.services.Geocoder();

        // 마커 이미지의 주소
        var imageSrc = 'https://www.flaticon.com/svg/static/icons/svg/619/619153.svg',
        // 마커 이미지의 크기
        imageSize = new kakao.maps.Size(25, 25),
        // 마커이미지의 옵션 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        imageOption = {offset: new kakao.maps.Point(10, 50)};
        // 지도에 마커를 표시하는 함수
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        const displayMarker = (place,idx) => {
            geocoder.addressSearch(place, (result, status) => {
                // 콜백 함수로 받은 주소의 좌표인 coords
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                // 마커 선언문
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                    image: markerImage
                });
                // 함수를 호출할때마다 중앙을 설정하면 정신없어보여서
                // idx 가 증가하면서 state값의 마지막 인덱스랑 동일할때 중앙을 설정
                if(idx === address.fulladdressname.length-1){
                    map.setCenter(coords);
                }
                // 만약 display에서 받은 매개변수로 받은 주소(place)와 showArea에서 받은 주소가 같다면
                // content는 해당 집의 세부 정보(가격,평수) 저장
                if(place === address.fulladdressname[idx]){
                    var content = '<div class="content">'
                    +'<div class="info">'
                    + address.apartname[idx]
                    + '</div>'
                    +'<div class="details">'
                    + '<div> 실거래가: '+address.price[idx]+' (만 원)</div>'
                    + '<div> 면적: '+address.area[idx]+' (㎡)</div>'
                    + '<div> 최초게재: '+address.monthday[idx]+'</div>'
                    + '<div> 층수: '+address.floor[idx]+'층</div>'
                    + '<button id="etc">매물 더보기</button>'
                    + '</div>'
                    + '</div>'
                }
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                kakao.maps.event.addListener(marker, 'click', ()=> {
                    // 컨텐트 설정
                    infowindow.setContent(content);
                    // 인포윈도우 열기
                    infowindow.open(map, marker);
                    var etcshow = document.getElementById("etc");
                    etcshow.addEventListener("click",()=>{
                        let more_goods = document.getElementById("goods_modal");
                        more_goods.style.display="block";
                        let apartinfo = document.getElementsByClassName("info")[0].innerHTML;
                        let apartdict = {}
                        apartdict.info = apartinfo
                        const reqoption = {
                            method:'POST',
                            headers:{
                                "Content-Type": "application/json; charset=utf-8"
                            },
                            body : JSON.stringify(apartdict)
                        }
                        fetch("info",reqoption)
                        .then(res=>res.json())
                        .then(responsejson=>{
                            this.setState({
                                detailarea : responsejson.area,
                                detailfloor : responsejson.floor,
                                detailmonthday : responsejson.monthday,
                                detailprice : responsejson.price
                            })
                        })
                    })
                });
            })
        }
        // 키워드로 장소를 검색
        // 장소 배열의 길이만큼 idx를 증가시켜서 displayMarker를 호출
        for(var idx=0; idx < address.fulladdressname.length; idx++){
            // idx 인덱스 하나하나 주소를 검색하면서 인덱스 값도 같이 넣어준다
            displayMarker(address.fulladdressname[idx],idx)
        } 
    }
    GuChange = () =>{
        var jongno = ["청운효자동","사직동","삼청동","부암동","평창동","무악동","교남동","가회동","종로1가","종로2가","종로3가"];
        var jung = ["소공동","회현동","명동","필동","장충동","광희동","을지로동","신당동","다산동","약수동","청구동","신당5동","동화동","황학동","중림동"];
        var yongsan = ["후암동","용산2가동","남영동","청파동","원효로1동","원효로2동","효창동","용문동","한강로동","이촌1동","이촌2동","이태원1동","이태원2동","한남동","서빙고동","보광동"];
        var sungdong =["왕십리도선동","왕십리2동","마장동","사근동","행당1동","행당2동","응봉동","금호1가동","금호2","3가동","금호4가동","옥수동","성수1가1동","성수1가2동","성수2가1동","성수2가3동","송정동","용답동"];
        var gwangjin =["중곡1동","중곡2동","중곡3동","중곡4동","능동","구의1동","구의2동","구의3동","광장동","자양1동","자양2동","자양3동","자양4동","화양동","군자동"]
        var dongdaemun=["용신동","제기동","전농1동","전농2동","답십리1동","답십리2동","장안1동","장안2동","청량리동","회기동","휘경1동","휘경2동","이문1동","이문2동"]
        var jungnang=["면목동","면목2동","면목3","8동","면목4동","면목5동","면목7동","상봉1동","상봉2동","중화1동","중화2동","묵1동","묵2동","망우본동","망우3동","신내1동","신내2동"]
        var sungbuk=["성북동","삼선동","동선동","돈암1동","돈암2동","안암동","보문동","정릉1동","정릉2동"," 정릉3동","정릉4동","길음1동","길음2동","종암동","월곡1동","월곡2동","장위1동","장위2동","장위3동","석관동"]
        var gangbuk=["삼양동","미아동","송중동","송천동","삼각산동","번1동","번2동","번3동","수유1동","수유2동","수유3동","우이동","인수동"]
        var dobong=["쌍문1동","쌍문2동","쌍문3동","쌍문4동","방학1동","방학2동","방학3동","창1동","창2동","창3동","창4동","창5동","도봉1동","도봉2동"]
        var nowon=["월계1동","월계2동","월계3동","공릉1동","공릉2동","하계1동","하계2동","중계본동","중계1동","중계2","3동","중계4동","상계1동","상계2동","상계3","4동","상계5동","상계6","7동","상계8동","상계9동","상계10동"]
        var eunpyeong=["녹번동","불광1동","불광2동","갈현1동","갈현2동","구산동","대조동","응암1동","응암2동","응암3동","역촌동","신사1동","신사2동","증산동","수색동","진관동"]
        var seodaemun=["충현동","천연동","북아현동","신촌동","연희동","홍제1동","홍제2동","홍제3동","홍은1동","홍은2동","남가좌1동","남가좌2동","북가좌1동","북가좌2동"]
        var mapo=["공덕동","아현동","도화동","용강동","대흥동","염리동","신수동","서강동","서교동","합정동","망원1동","망원2동","연남동","성산1동","성산2동","상암동"]
        var yangchun=["목1동","목2동","목3동","목4동","목5동","신월1동","신월2동","신월3동","신월4동","신월5동","신월6동","신월7동","신정1동","신정2동","신정3동","신정4동","신정6동","신정7동"]
        var gangseo=["염창동","등촌1동","등촌2동","등촌3동","화곡본동","화곡1동","화곡2동","화곡3동","화곡4동","화곡6동","화곡8동","우장산동","가양1동","가양2동","가양3동","발산1동","공항동","방화1동","방화2동","방화3동"]
        var guro=["신도림동","구로1동","구로2동","구로3동","구로4동","구로5동","가리봉동","수궁동","고척1동","고척2동","개봉1동","개봉2동","개봉3동","오류1동","오류2동"]
        var geumchon=["가산동","독산1동","독산2동","독산3동","독산4동","시흥1동","시흥2동","시흥3동","시흥4동","시흥5동"]
        var yeongdeungpo=["영등포본동","영등포동","여의동","당산1동","당산2동","도림동","문래동","양평1동","양평2동","신길1동","신길3동","신길4동","신길5동","신길6동","신길7동","대림1동","대림2동","대림3동"]
        var dongjak=["노량진1동","노량진2동","상도1동","상도2동","상도3동","상도4동","흑석동","사당1동","사당2동","사당3동","사당4동","사당5동","대방동","신대방1동","신대방2동"]
        var guanak=["보라매동","은천동","성현동","중앙동","청림동","행운동","청룡동","낙성대동","인헌동","남현동","신림동","신사동","조원동","미성동","난곡동","난향동","서원동","신원동 ","서림동","삼성동","대학동"]
        var seocho=["서초1동","서초2동","서초3동","서초4동","잠원동","반포본동","반포1동","반포2동","반포3동","반포4동","방배본동","방배1동","방배2동","방배3동","방배4동","양재1동","양재2동","내곡동"]
        var gangnam=["신사동","압구정동","청담동","논현1동","논현2동","삼성1동","삼성2동","대치1동","대치2동","대치4동","역삼1동","역삼2동","도곡1동","도곡2동","개포1동","개포2동","개포4동","일원본동","일원1동","일원2동","수서동","세곡동"]
        var songpa=["풍납1동","풍납2동","거여1동","거여2동","마천1동","마천2동","방이1동","방이2동","오륜동","오금동","송파1동","송파2동","석촌동","삼전동","가락본동","가락1동","가락2동","문정1동","문정2동","장지동","위례동","잠실본동","잠실2동","잠실3동","잠실4동","잠실6동","잠실7동"]
        var gangdong=["강일동","상일동","명일1동","명일2동","고덕1동","고덕2동","암사1동","암사2동","암사3동","천호1동","천호2동","천호3동","성내1동","성내2동","성내3동","길동","둔촌1동","둔촌2동"]
        var currentvalue = document.getElementById("guselect").value;
        var target = document.getElementById("dongselect");
        var selectedgu;

        if(currentvalue === "jongno")  selectedgu = jongno;
        else if(currentvalue ==="jung")  selectedgu = jung;
        else if(currentvalue ==="yongsan")  selectedgu = yongsan;
        else if(currentvalue ==="sungdong")  selectedgu = sungdong;
        else if(currentvalue ==="gwangjin")  selectedgu = gwangjin;
        else if(currentvalue ==="dongdaemun")  selectedgu = dongdaemun;
        else if(currentvalue ==="jungnang")  selectedgu = jungnang;
        else if(currentvalue ==="sungbuk")  selectedgu = sungbuk;
        else if(currentvalue ==="gangbuk")  selectedgu = gangbuk;
        else if(currentvalue ==="dobong")  selectedgu = dobong;
        else if(currentvalue ==="nowon")  selectedgu = nowon;
        else if(currentvalue ==="eunpyeong")  selectedgu = eunpyeong;
        else if(currentvalue ==="seodaemun")  selectedgu = seodaemun;
        else if(currentvalue ==="mapo")  selectedgu = mapo;
        else if(currentvalue ==="yangchun")  selectedgu = yangchun;
        else if(currentvalue ==="gangseo")  selectedgu = gangseo;
        else if(currentvalue ==="guro")  selectedgu = guro;
        else if(currentvalue ==="geumchon")  selectedgu = geumchon;
        else if(currentvalue ==="yeongdeungpo")  selectedgu = yeongdeungpo;
        else if(currentvalue ==="dongjak")  selectedgu = dongjak;
        else if(currentvalue ==="guanak")  selectedgu = guanak;
        else if(currentvalue ==="seocho")  selectedgu = seocho;
        else if(currentvalue ==="gangnam")  selectedgu = gangnam;
        else if(currentvalue ==="songpa")  selectedgu = songpa;
        else if(currentvalue ==="gangdong")  selectedgu = gangdong;

        target.length = 0;

        for(var idx in selectedgu){
            var opt = document.createElement("option");
            opt.value = selectedgu[idx];
            opt.innerHTML = selectedgu[idx];
            target.appendChild(opt);
        }
    }
    closemodal = () =>{
        let more_goods = document.getElementById("goods_modal");
        more_goods.style.display="none"
    }
    _detailRender = () =>{
        const detailList = this.state.detailarea.map((detailarr,index)=>{
            return <Detailrender detailarea={detailarr}
            detailfloor={this.state.detailfloor[index]}
            detailmonthday={this.state.detailmonthday[index]}
            detailprice={this.state.detailprice[index]}
            key={index}/>
        })
        return detailList
    }
    render(){
        return(
            <Fragment>
            <Header/>
            <section>
                <div className="area">
                        <article>지역으로 찾기</article>
                    <div>
                        <h3>시</h3>
                        <select name="si" id="siselect">
                            <option>===선택하세요===</option>
                            <option value ="seoul">서울특별시</option>
                        </select>
                    </div>
                    <div>
                        <h3>구</h3>
                        <select name="gu" id="guselect"onChange={this.GuChange}>
                            <option>===선택하세요===</option>
                            <option value ="gangnam">강남구</option>
                            <option value ="gangdong">강동구</option>
                            <option value ="gangbuk">강북구</option>
                            <option value ="gangseo">강서구</option>
                            <option value ="guanak">관악구</option>
                            <option value ="gwangjin">광진구</option>
                            <option value ="guro">구로구</option>
                            <option value ="geumchon">금천구</option>
                            <option value ="nowon">노원구</option>
                            <option value ="dobong">도봉구</option>
                            <option value ="dongdaemun">동대문구</option>
                            <option value ="dongjak">동작구</option>
                            <option value ="mapo">마포구</option>
                            <option value ="seodaemun">서대문구</option>
                            <option value ="seocho">서초구</option>
                            <option value ="sungdong">성동구</option>
                            <option value ="sungbuk">성북구</option>
                            <option value ="songpa">송파구</option>
                            <option value ="yangchun">양천구</option>
                            <option value ="yeongdeungpo">영등포구</option>
                            <option value ="yongsan">용산구</option>
                            <option value ="eunpyeong">은평구</option>
                            <option value ="jongno">종로구</option>
                            <option value ="jung">중구</option>
                            <option value ="jungnang">중랑구</option>
                        </select>
                    </div>
                    <div>
                        <h3>동</h3>
                        <select name="dong" id="dongselect">
                            <option>===선택하세요===</option>
                        </select>
                    </div>
                    <section>
                        <button className="locsearch" onClick={this.AreaSearch}>검색</button>
                    </section>
                    <form className="address">
                        <article>주소로 찾기</article>
                        <input type="text" id="Addressinput"></input>
                        <button type="button" className="addressSerachbtn" onClick={this.AddressSearch}>검색</button>
                    </form>
                </div>
            </section>
            <div id="map" className="dealpagemap"></div>

            <div id="goods_modal">
                <div id="goods_content">
                    <span className="close" onClick={this.closemodal}>&times;</span>
                    <h1 className="apart_detail">{this.state.detailarea ? document.getElementsByClassName("info")[0].innerHTML : ''}</h1>
                    <div className="goods_headline">
                        <h3 className="headline_item">최초게재</h3>
                        <h3 className="headline_item">가격(만 원)</h3>
                        <h3 className="headline_item">면적(㎡)</h3>
                        <h3 className="headline_item">층</h3>
                    </div>
                    {this.state.detailarea ? this._detailRender() : ''}
                </div>
            </div>
            </Fragment>
        )
    }
}
class Detailrender extends Component{
    render(){
        return(
            <div className="renderdetail">
                    <div className="item">{this.props.detailmonthday}</div>
                    <div className="item">{this.props.detailprice}</div>
                    <div className="item">{this.props.detailarea}</div>
                    <div className="item">{this.props.detailfloor}</div>
            </div>
        )
    }
}
export default Dealpage;