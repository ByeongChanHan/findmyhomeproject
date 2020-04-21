from flask import Flask,request,redirect
from flask_cors import CORS
import sqlite3
import requests
from datetime import datetime

now = datetime.now()

app = Flask(__name__)
CORS(app)

@app.route('/write', methods=['GET', 'POST'])
def showclass():
    # 5000으로 route받았으면 해당 함수 실행
    if request.method == 'POST':
        # 요청메소드가 POST방식이면
        titleData = request.json.get('title')
        textareaplace = request.json.get('inputText')
        currentDatetime = "{}-{}-{}".format(now.year, now.month, now.day)
        conn = sqlite3.connect('writelist.db')
        print ("Opened database successfully")
        cur = conn.cursor()
        cur.execute("insert into writeDB(title,userwrote,wrotedate) values(?,?,?)",(titleData,textareaplace,currentDatetime))
        conn.commit()
        conn.close()
        return '데이터 삽입 성공'

@app.route('/board', methods=['GET', 'POST'])
def showboard():
    if request.method == 'GET':
        conn = sqlite3.connect('writelist.db')
        print ("Opened database successfully")
        cur = conn.cursor()
        cur.execute("select * from writeDB")
        data = cur.fetchall()
        # 실행하고 난 결과값을 fetchall(전부 선택)해서 data변수에 저장
        print(type(data))
        # 타입값 LIST형식
        conn.close()
        result=dict()
        # 결과값은 문자열 빈칸으로 초기화
        titleArr = []
        userwroteArr = []
        wrotedateArr = []
        for row in data:
            titleArr.append(row[0])
            userwroteArr.append(row[1])
            wrotedateArr.append(row[2])
            result['title'] = titleArr
            result['userwrote'] = userwroteArr
            result['wrotedate'] = wrotedateArr
        return result
    elif request.method == 'POST':
        savenum = request.json.get('savenum')
        print(savenum)
        conn = sqlite3.connect('writelist.db')
        print ("POST REQUEST SUCCESSFUL")
        cur = conn.cursor()
        cur.execute("insert into writeDB(viewnum) values(?)",(savenum))
        conn.commit()
        conn.close()
        return '조회수 저장 완료'
        
if __name__ == '__main__':
    app.run(debug=True)