실행방법:
src폴더에서 yarn start  
실행했는데 react-script error나면 npm update 명령어 실행  
터미널 하나 더 열어서 python server.py 구동  
DB: src 안에 writelist.db 있는데 열면 테이블과 속성값 다 볼수있음  

주의:
로컬에서는 localhost주소가 먹지만
서버 구동할때는 아이피 주소를 직접 써줘야함

서버 구동 순서:
package.json 맨밑 proxy 부분에 서버 주소 기입
noticeboard.js 내용중 맨밑에 있는 http://xxx.xxx.xxx.xxx:3000/board/${this.props.num}
서버 ip로 바꿔주기