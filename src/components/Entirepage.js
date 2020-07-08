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
    }
    _scrollToggle = () =>{
        $('html,body').on('mousewheel',(e)=>{
            var iswheel = e.originalEvent.wheelDelta;
            var bannerArea = $(".banner").innerHeight()
            // banner 크기 보다 작으면서 스크롤 밑으로 내릴때
            if(iswheel <= 0 && document.documentElement.scrollTop < bannerArea){
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
            else if(document.documentElement.scrollTop > bannerArea){
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
                <Header/>
                <Parentbanner/>
                <Description/>
                <Footer/>
            </div>
        )
    }
}
// Header.defaultProps = {LoginText : Entirepage.state}
export default Entirepage