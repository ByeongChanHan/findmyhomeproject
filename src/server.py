from flask import Flask,request,redirect
from flask_cors import CORS
import sqlite3
import requests
from datetime import datetime

now = datetime.now()

app = Flask(__name__)

# 서로다른 포트에서 연결할때 cors에러 나는데 cors정책을 모두 허용해주는 flask_cors라이브러리 사용
CORS(app)

# 글 작성하고 작성하기 버튼 눌렀을때 실행
@app.route('/write', methods=['GET', 'POST'])
def showclass():
    # 5000으로 route받았으면 해당 함수 실행
    if request.method == 'POST':
        # 요청메소드가 POST방식이면
        # 요청한 객체의 title,inputText키값을 불러옴
        titleData = request.json.get('title')
        textareaplace = request.json.get('inputText')
        # 현재 시간 변수
        currentDatetime = "{}-{}-{}".format(now.year, now.month, now.day)
        # db연결
        conn = sqlite3.connect('writelist.db')
        # 커서 셋팅
        cur = conn.cursor()
        # insert로 가져온 데이터를 삽입
        cur.execute("insert into writeDB(title,userwrote,wrotedate) values(?,?,?)",(titleData,textareaplace,currentDatetime))
        conn.commit()
        conn.close()
        return '게시물 작성을 완료하였습니다.'

# 게시판에 들어왔을때 실행
@app.route('/board', methods=['GET', 'POST'])
def showboard():
    # get메소드이면
    if request.method == 'GET':
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        # select로 모든 데이터들을 선택
        cur.execute("select * from writeDB")
        # 실행하고 난 결과값을 fetchall(전부 선택)해서 data변수에 저장
        data = cur.fetchall()
        conn.close()
        # 딕셔너리 result선언
        result=dict()
        # result안에 들어갈 배열 선언
        titleArr = []
        userwroteArr = []
        wrotedateArr = []
        # for로 fetchall한 모든 데이터를 row로 받고
        for row in data:
            # row의 0번째는 제목의 열
            titleArr.append(row[0])
            # row의 1번째는 내용의 열
            userwroteArr.append(row[1])
            # row의 2번째는 작성날짜의 열
            wrotedateArr.append(row[2])
            # title,userwrote,wrotedate키에 배열을 집어넣는 모습
            result['title'] = titleArr
            result['userwrote'] = userwroteArr
            result['wrotedate'] = wrotedateArr
            # 다 집어넣은 배열을 return
        return result
# 구동 함수
if __name__ == '__main__':
    app.run(debug=True)