<h1>부동산 커뮤니티 & 매물조회 프로젝트</h1>

실행방법:
src폴더에서 yarn start  
실행했는데 react-script error나면 npm update 명령어 실행  
터미널 하나 더 열어서 python server.py 구동  
DB: src 안에 writelist.db 파일

주의:
로컬에서는 localhost주소가 먹지만
서버 구동할때는 아이피 주소를 직접 기입 필요

서버 구동 순서:
package.json 맨밑 proxy 부분에 서버 주소 기입
noticeboard.js 내용중 맨밑에 있는 http://xxx.xxx.xxx.xxx:3000/board/${this.props.num}과
askquestion.js 에 goBoardPage 함수에 있는 url을
서버 ip로 바꿔주기
