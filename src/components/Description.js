import React,{Component} from 'react';
import realestate from '../images/realestate.jpg';
import ask from '../images/ask.jpg';
import '../stylesheets/NotoSans.css';

class Description extends Component{
    _Desc =[
        {
            Clname : "findYourplace",
            imgFile : realestate,
            ImgClname : "desImg",
            headLinename : "howto",
            DescDesign : "descDesign",
            BtnId : "Selectoption",
            Title : "First",
            DescExplain : "살고 싶은 집의 옵션을 선택해보세요",
            BtnText : "옵션선택"
        },
        {
            Clname : "findYourplace",
            imgFile : ask,
            ImgClname : "desImg",
            headLinename : "howto",
            DescDesign : "descDesign",
            BtnId : "Askrealestate",
            Title : "Second",
            DescExplain : "전문가에게 물어보면 자세한 답변을 얻을 수 있습니다",
            BtnText : "질문하기"
        }
    ]
    render(){
        return(
            this._Desc.map((descarr,index)=>{
                return <DescriptionExplain
                 Clname={descarr.Clname}
                 imgFile={descarr.imgFile}
                 ImgClname={descarr.ImgClname}
                 headLinename={descarr.headLinename}
                 DescDesign={descarr.DescDesign}
                 btnid={descarr.BtnId}
                 Title={descarr.Title}
                 DescExplain={descarr.DescExplain}
                 BtnText={descarr.BtnText}
                 key={index}>
                 </DescriptionExplain>
            })
        )
    }
}

class DescriptionExplain extends Component{
    render(){
        return(
            <div className={this.props.Clname}>
                <img src={this.props.imgFile} className = {this.props.ImgClname} alt="descImg"/>
                <h1 className={this.props.headLinename}>{this.props.Title}</h1>
                <p className={this.props.DescDesign}>{this.props.DescExplain}</p>
                <button id = {this.props.btnid}><b>{this.props.BtnText}</b></button>
            </div>
        )
    }
}

class DescriptionEntire extends Component{
    render(){
        return(
            <section className = "description">
                <Description/>
            </section>
        )
    }
}
export default DescriptionEntire