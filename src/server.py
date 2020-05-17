from flask import Flask,request,redirect,session,app,url_for
from flask_cors import CORS
import sqlite3
import requests
from datetime import datetime,timedelta

now = datetime.now()

app = Flask(__name__)
app.secret_key = 'secret key'

# 서로다른 포트에서 연결할때 cors에러 나는데 cors정책을 모두 허용해주는 flask_cors라이브러리 사용
CORS(app)
@app.before_request
def session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=5)
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
        viewnumArr = []
        # for로 fetchall한 모든 데이터를 row로 받고
        for row in data:
            # row의 0번째는 제목의 열
            titleArr.append(row[0])
            # row의 1번째는 내용의 열
            userwroteArr.append(row[1])
            # row의 2번째는 작성날짜의 열
            wrotedateArr.append(row[2])
            viewnumArr.append(row[3])
            # title,userwrote,wrotedate키에 배열을 집어넣는 모습
            result['title'] = titleArr
            result['userwrote'] = userwroteArr
            result['wrotedate'] = wrotedateArr
            result['viewnum'] = viewnumArr
            # 다 집어넣은 배열을 return
        return result
    # elif request.method == 'POST':
    #     title = request.json.get('title')
    #     currentnum = request.json.get('currentnum')
    #     conn = sqlite3.connect('writelist.db')
    #     cur = conn.cursor()
    #     cur.execute("update writeDB set viewnum=? where title=?",(currentnum,title))
    #     conn.commit()
    #     conn.close()
    #     return "success"

@app.route('/board/<writenum>', methods=['GET', 'POST'])
def selectBoard(writenum):
    if request.method == 'POST':
        title = request.json.get('title')
        currentnum = request.json.get('currentnum')
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        cur.execute("update writeDB set viewnum=? where title=?",(currentnum,title))
        conn.commit()
        conn.close()
        return writenum

@app.route('/signupagent', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        reqID = request.json.get('id')
        reqPassword = request.json.get('password')
        reqRePassword = request.json.get('RepwdText')
        reqEmail = request.json.get('emailText')
        reqAgent = request.json.get('AgentText')
        if reqPassword != reqRePassword:
            return "패스워드가 일치하지 않습니다."
        else:
            try:
                conn = sqlite3.connect('writelist.db')
                cur = conn.cursor()
                cur.execute("insert into userInformation(ID,password,Repassword,email,brokernumber) values(?,?,?,?,?)",(reqID,reqPassword,reqRePassword,reqEmail,reqAgent))
                conn.commit()
                conn.close()
                return "회원가입이 완료되었습니다."
            except sqlite3.Error as e:
                print("An error occurred:", e.args[0])
                return "이미 존재하는 ID이거나 존재하는 중개사번호입니다"

@app.route('/login', methods=['GET', 'POST'])
def loginform():
    if request.method == 'POST':
        idText = request.json.get('idtext')
        pwdText = request.json.get('passwordtext')
        session['id'] = idText
        print(session['id'])
        
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        cur.execute('select ID,password from userInformation where ID=? and password=?',(idText,pwdText))
        IdData = cur.fetchone()
        print(IdData)
        cur.close()
        if IdData == None:
            return "존재하지 않는 ID이거나 비밀번호가 틀립니다"
        else:
            return redirect(url_for("main"))
@app.route('/',methods=['GET', 'POST'])
def main():
    if request.method == 'GET':
        print(session)
        if 'id' in session:
            idtext = session['id']
            print(session)
            return idtext
        return "로그인실패"
# @app.route('/', methods=['GET', 'POST'])
# def main():
#     if request.method == 'GET':
#         print(session)
#         return ''

# 구동 함수
if __name__ == '__main__':
    app.run(debug=True)