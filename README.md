<h1>부동산 커뮤니티 & 매물조회 프로젝트</h1>
<div>
<h2>스크린샷</h2>
  <img src="https://user-images.githubusercontent.com/62338659/103151042-b40bdf00-47bd-11eb-89b1-1e936ed1a484.png" width="90%">
  <img src="https://user-images.githubusercontent.com/62338659/103151041-b2421b80-47bd-11eb-9017-6f1b9d21825f.png" width="90%">
  <img src="https://user-images.githubusercontent.com/62338659/103151053-c423be80-47bd-11eb-8b42-228435ce15c3.png" width="90%">
  <img src="https://user-images.githubusercontent.com/62338659/103151048-c128ce00-47bd-11eb-9e1c-0c8f8d03b533.png" width="90%">
  <img src="https://user-images.githubusercontent.com/62338659/103151051-c38b2800-47bd-11eb-8706-543d0e333a8a.png" width="90%">
  <img src="https://user-images.githubusercontent.com/62338659/103151049-c259fb00-47bd-11eb-9c10-8fe387d3a08e.png" width="90%">
</div>

<h2>실행방법</h2>
src폴더에서 yarn start  
실행했는데 react-script error나면 npm update 명령어 실행  
터미널 하나 더 열어서 python server.py 구동  
DB: src 안에 writelist.db 파일

<h2>주의</h2>
로컬에서는 localhost주소가 먹지만
서버 구동할때는 아이피 주소를 직접 기입 필요

<h2>서버 구동 순서</h2>
package.json 맨밑 proxy 부분에 서버 주소 기입
noticeboard.js 내용중 맨밑에 있는 http://xxx.xxx.xxx.xxx:3000/board/${this.props.num}과
askquestion.js 에 goBoardPage 함수에 있는 url을
서버 ip로 바꿔주기
