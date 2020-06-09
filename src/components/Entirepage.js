import React,{Component} from 'react';
import Header from './HeaderComponent';
import Parentbanner from './Parentbanner';
import Description from './Description';
import Footer from './footer'
import $ from "jquery";
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;


class Entirepage extends Component{
    // 메인페이지 전체 구성
    componentDidMount(){
        window.addEventListener("scroll",this._scrollToggle(),true)
        this._getId()
    }
    // 아이디를 불러오기
    callLogin = () =>{
        return fetch("http://localhost:5000/",{ credentials: 'include' })
        .then(res=>{
            let _Idtext = res.json()
            return _Idtext
        })
    }
    _getId = async () =>{
        const GetLogin = await this.callLogin()
        this.setState({
            LoginText : GetLogin.showid
        })
        console.log(this.state.LoginText)
        return GetLogin
    }
    _scrollToggle = () =>{
            $('html,body').on('mousewheel',(e)=>{
                var iswheel = e.originalEvent.wheelDelta;
                // 스크롤 밑으로 내릴때와 가려진 공간이 위에 있는 사진의 영역일때 (930이하)
                if(iswheel <= 0 && document.documentElement.scrollTop < 930){
                    // 밑에 비디오의 시작점 가져오고
                    var offset = $(".mainVideo").offset();
                    setTimeout(()=>{
                        $("html,body").animate({
                            scrollTop : offset.top
                        },1000)
                        $(".DescExplain").fadeTo(1000,1)
                        $(".SiteExplain").fadeTo(500,0)
                    },100)
                    // 애니메이션이 반복되면 스크롤이 고정되는 현상이있어 stop으로 정지시킴
                    $("html,body").stop()
                    $(".DescExplain").stop()
                    $(".SiteExplain").stop()
                }
                else if(document.documentElement.scrollTop > 930){
                    $("html,body").stop()
                }
                // // 스크롤 위로 올릴때
                else if(iswheel >= 0){
                    var banneroffset = $(".banner").offset();
                    setTimeout(()=>{
                        $("html,body").animate({
                            scrollTop : banneroffset.top
                        },1000)
                        $(".DescExplain").fadeTo(500,0)
                        $(".SiteExplain").fadeTo(1000,1)
                    },100)
                    $("html,body").stop()
                    $(".SiteExplain").stop()
                }
            })
    }
    render(){
        return(
            <div>
                <Header logintext = '까불'/>
                <Parentbanner/>
                <Description/>
                <Footer/>
            </div>
        )
    }
}
// Header.defaultProps = {LoginText : Entirepage.state}
export default Entirepage