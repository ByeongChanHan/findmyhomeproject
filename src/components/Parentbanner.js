import React,{Component} from 'react';
import Banner from './bannerComponent';
import '../stylesheets/NotoSans.css';
import {fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';

// 메인페이지 글씨 페이드인 Animation
const fadeInAnimation = keyframes`${fadeIn}`;
const FadeIn = styled.div`
animation : 2s ${fadeInAnimation}`;

class Parentbanner extends Component{
    render(){
        return(
            <section className = "banner">
                {/* 애니메이션 구역 */}
                <FadeIn>
                    <div className="SiteExplain">
                    이젠 허위매물에 속지 말고<br></br>
                    검증된 중개사에게 추천받아요!<br></br>
                        <section className= "details">
                            {/* 배너 클래스 */}
                            <Banner/>
                        </section>
                        <br></br>
                        {/* ask 파라미터로 이동 */}
                        <a href = "/ask" id = "askbtn">
                            중개사에게 질문하기
                        </a>
                    </div>
                </FadeIn>
            </section>
        )
    }
}
export default Parentbanner