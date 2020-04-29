import React,{Component} from 'react';
import Banner from './bannerComponent';
import '../stylesheets/NotoSans.css';
import {slideInDown} from 'react-animations';
import styled, { keyframes } from 'styled-components';

// 메인페이지의 글씨 떨어지는 Animation
const slideInDownAnimation = keyframes`${slideInDown}`;
const SlideInDown = styled.div`
animation : 2s ${slideInDownAnimation}`;

class Parentbanner extends Component{
    render(){
        return(
            <section className = "banner">
                {/* 애니메이션 구역 */}
                <SlideInDown>
                    <div className="SiteExplain">
                    이젠 허위매물에 속지 말고<br></br>
                    검증된 중개사에게 추천받아요!<br></br>
                        <section className= "details">
                            {/* 배너 클래스 */}
                            <Banner/>
                        </section>
                        <br></br>
                        {/* ask 파라미터로 이동 */}
                        <a href = "/ask" id = "startid">
                            중개사에게 질문하기
                        </a>
                    </div>
                </SlideInDown>
            </section>
        )
    }
}
export default Parentbanner