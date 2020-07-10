from flask import Flask,request,redirect,session,app,url_for
from flask_cors import CORS,cross_origin
import sqlite3
import requests
from datetime import datetime,timedelta
from bs4 import BeautifulSoup

now = datetime.now()
# 시크릿키가 있어야 세션유지 가능
app = Flask(__name__)
app.secret_key = 'secret key'
app.permanent_session_lifetime = timedelta(minutes=15)

# 서로다른 포트에서 연결할때 cors에러 나서 cors정책을 모두 허용해주는 flask_cors라이브러리 사용
CORS(app)
# 세션이 5분동안 유지되게 하는 구문
# permanent값을 True로 줌
@app.before_request
def session_permanent():
    session.permanent = True
# 글 작성하고 작성하기 버튼 눌렀을때 실행
@app.route('/write', methods=['GET', 'POST'])
def showclass():
    # 5000으로 route받았으면 해당 함수 실행
    if request.method == 'POST':
        # 요청메소드가 POST방식이면
        # 요청한 객체의 title,inputText키값을 불러옴
        titleData = request.json.get('title')
        textareaplace = request.json.get('inputText')
        categoryoption = request.json.get('selectoptions')[0]
        flooroption = request.json.get('selectoptions')[1]
        structureoption = request.json.get('selectoptions')[2]
        reqid = request.json.get('writeid')
        # 현재 시간 변수
        currentDatetime = "{}-{}-{}".format(now.year, now.month, now.day)
        # db연결
        conn = sqlite3.connect('writelist.db')
        # 커서 셋팅
        cur = conn.cursor()
        # insert로 가져온 데이터를 삽입
        cur.execute("insert into writeDB(title,userwrote,wrotedate,categoryoption,flooroption,structureoption,writeid) values(?,?,?,?,?,?,?)",(titleData,textareaplace,currentDatetime,categoryoption,flooroption,structureoption,reqid))
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
        listnumArr = []
        idArr = []
        # for로 fetchall한 모든 데이터를 row로 받고
        for row in data:
            # row의 0번째는 제목의 열
            titleArr.append(row[0])
            # row의 1번째는 내용의 열
            userwroteArr.append(row[1])
            # row의 2번째는 작성날짜의 열
            wrotedateArr.append(row[2])
            viewnumArr.append(row[3])
            listnumArr.append(row[4])
            # row의 8번째 글을 올린 닉네임
            idArr.append(row[8])
        # title,userwrote,wrotedate키에 배열을 집어넣는 모습
        result['title'] = titleArr
        result['userwrote'] = userwroteArr
        result['wrotedate'] = wrotedateArr
        result['viewnum'] = viewnumArr
        result['listnum'] = listnumArr
        result['writeid'] = idArr
        # 다 집어넣은 배열을 return
        return result
    # 게시판에서 글을 클릭했을때 post요청이 가면서 update 쿼리문으로 조회수를 늘림(조회수 증가)
    elif request.method == 'POST':
        listnum = request.json.get('listnum')
        currentnum = request.json.get('currentnum')
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        cur.execute("update writeDB set viewnum=? where listnum=?",(currentnum,listnum))
        conn.commit()
        conn.close()
        return "success"
# 게시판에서 글을누르고 나면 페이지 url뒤에 params가 붙어서 react에서 params를 붙이고 요청을 보내면
# board/<아무문자>를 받아 라우팅되게끔 구현
# 여기서는 번호를 board뒤에 붙어서 받음(게시판에서 글을 클릭했을때 코드 실행)
@app.route('/board/<numurl>', methods=['GET', 'POST'])
def selectBoard(numurl):
    if request.method == 'GET':
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        # 클릭한 글의 정보를 db에서 조회
        cur.execute("select title,userwrote,wrotedate,viewnum,categoryoption,flooroption,structureoption,writeid from writeDB where listnum=?",(numurl,))
        # 하나의 데이터만 선택
        Viewdata = cur.fetchone()
        conn.close()
        # 선택한 글의 댓글 불러오기
        connection = sqlite3.connect('writelist.db')
        cursorlocation = connection.cursor()
        cursorlocation.execute('select commentText,currentTime,commentid from comment,writeDB where comment.listnum = ? and comment.listnum = writeDB.listnum',(numurl,))
        # 댓글이 여러개있을경우 다 골라야 하므로 fetchall을 써줌
        commentdataSet = cursorlocation.fetchall()
        connection.close()
        # 조회수 순위 내림차순 정렬 쿼리
        junction = sqlite3.connect('writelist.db')
        junctioncur = junction.cursor()
        junctioncur.execute('select distinct title from writeDB order by viewnum desc')
        rankingdata = junctioncur.fetchall()
        junction.close()
        # 딕셔너리 안에 배열 삽입(배열을 리턴하면 오류 발생)
        Selectdict = dict()
        titleArr = []
        userwroteArr = []
        wrotedateArr = []
        viewnumArr = []
        commentTitleArr = []
        currentTimeArr = []
        commentidArr = []
        categoryoptionArr = []
        flooroptionArr = []
        structureoptionArr = []
        writeidArr = []
        # row의 0번째는 제목의 열
        titleArr.append(Viewdata[0])
        # row의 1번째는 내용의 열
        userwroteArr.append(Viewdata[1])
        # row의 2번째는 작성날짜의 열
        wrotedateArr.append(Viewdata[2])
        # row의 3번째는 조회수의 열
        viewnumArr.append(Viewdata[3])
        # row의 4번째는 매물종류
        categoryoptionArr.append(Viewdata[4])
        # row의 5번째는 층수옵션
        flooroptionArr.append(Viewdata[5])
        # row의 6번째는 구조옵션
        structureoptionArr.append(Viewdata[6])
        # row의 7번째는 글쓴 닉네임
        writeidArr.append(Viewdata[7])
        for rows in commentdataSet:
            commentTitleArr.append(rows[0])
            currentTimeArr.append(rows[1])
            commentidArr.append(rows[2])
        # 배열에 다 넣었으면
        # SelectTitle,Selectuserwrote,Selectwrotedate,Selectviewnum키에 배열을 집어넣고
        Selectdict['SelectTitle'] = titleArr
        Selectdict['Selectuserwrote'] = userwroteArr
        Selectdict['Selectwrotedate'] = wrotedateArr
        Selectdict['Selectviewnum'] = viewnumArr
        # 댓글까지 추가
        Selectdict['comment'] = commentTitleArr
        Selectdict['currentTime'] = currentTimeArr
        Selectdict['commentid'] = commentidArr
        # 랭킹 제목 데이터
        Selectdict['rankingdata'] = rankingdata
        Selectdict['categoryoption'] = categoryoptionArr
        Selectdict['flooroption'] = flooroptionArr
        Selectdict['structureoption'] = structureoptionArr
        Selectdict['selectid'] = writeidArr
        # dictionary를 리턴
        return Selectdict
    # 글쓰고 답변달았을때는 여기로 옴
    elif request.method == 'POST':
        commentText = request.json.get('commentText')
        commentid = request.json.get('commentid')
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        # 댓글을 insert로 db에 저장함
        cur.execute("insert into comment(listnum,commentText,commentid) values(?,?,?)",(numurl,commentText,commentid))
        conn.commit()
        conn.close()
        return "작성이 완료되었습니다."
# 중개사 회원가입할때 들어오는 파라미터
@app.route('/signupagent', methods=['GET', 'POST'])
def agentregister():
    if request.method == 'POST':
        reqID = request.json.get('id')
        reqPassword = request.json.get('password')
        reqRePassword = request.json.get('RepwdText')
        reqEmail = request.json.get('emailText')
        reqAgent = request.json.get('AgentText')
        # 패스워드와 패스워드 확인값이 일치하지 않을때
        if reqPassword != reqRePassword:
            return "패스워드가 일치하지 않습니다."
        else:
            # id나 중개사번호는 unique속성이여서 중복될 수가 없는데 중복되면 예외처리에 걸리기때문에
            # 이미 존재하는 아이디나 겹치는 중개사번호는 예외처리인 except에서 처리
            connection = sqlite3.connect('writelist.db')
            cur = connection.cursor()
            cur.execute("select Ra_Regno from Number_data")
            brokernumberdata = cur.fetchall()
            connection.close()
            brokerArr = []
            for rowData in brokernumberdata:
                brokerArr.append(rowData[0])
            if reqAgent in brokerArr:
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
            else:
                return "유효하지 않은 중개사 번호입니다."
        return ""

# 일반회원 회원가입할때 들어오는 파라미터
@app.route('/signup', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        reqID = request.json.get('id')
        reqPassword = request.json.get('password')
        reqRePassword = request.json.get('RepwdText')
        reqEmail = request.json.get('emailText')
        reqPhonenum = request.json.get('PhoneText')
        if reqPassword != reqRePassword:
            return "패스워드가 일치하지 않습니다."
        else:
            try:
                conn = sqlite3.connect('writelist.db')
                cur = conn.cursor()
                cur.execute("insert into normalUser(ID,password,Repassword,email,PhoneNumber) values(?,?,?,?,?)",(reqID,reqPassword,reqRePassword,reqEmail,reqPhonenum))
                conn.commit()
                conn.close()
                return "회원가입이 완료되었습니다."
            except sqlite3.Error as e:
                print("An error occurred:", e.args[0])
                return "이미 존재하는 ID입니다"

# 중개사 정보가 저장 되어 있는 테이블과 일반 사용자 정보가 있는 테이블을 다 비교해야하기 때문에
# join을 이용한 쿼리문으로 수정예정
@app.route('/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def loginform():
    if request.method == 'POST':
        idText = request.json.get('idtext')
        pwdText = request.json.get('passwordtext')
        isagent = request.json.get('isagent')
        # false는 체크 x (일반사용자)
        if isagent == False:
            conn = sqlite3.connect('writelist.db')
            cur = conn.cursor()
            # id와 패스워드를 찾는 쿼리(수정요망)
            cur.execute('select ID,password from normalUser where ID=? and password=?',(idText,pwdText))
            IdData = cur.fetchone()
            conn.close()
        # true일경우(체크 됐을때)
        else:
            connectdb = sqlite3.connect('writelist.db')
            cursorlocation = connectdb.cursor()
            # id와 패스워드를 찾는 쿼리(수정요망)
            cursorlocation.execute('select ID,password from userInformation where ID=? and password=?',(idText,pwdText))
            IdData = cursorlocation.fetchone()
            connectdb.close()
        # id가 존재하지않을때
        if IdData == None:
            return "존재하지 않는 ID이거나 비밀번호가 틀립니다"
        else:
            # 세션에 id라는 키에 아이디를 저장
            session['id'] = idText
        return ''
# 헤더컴포넌트 라우팅
@app.route('/',methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def main():
    if request.method == 'GET':
        # # # key = '6a5a6f6e496d636835324e436c6870'
        # arr_start = 0
        # arr_end = 1000
        # startnumber = 1
        # endnumber = 1000
        # Ra_Regno = []
        # conn = sqlite3.connect('writelist.db',isolation_level=None)
        # # 커서생성(커서 = SQL 문을 실행하거나 실행된 결과를 돌려받는 통로)
        # cur = conn.cursor()
        # cur.execute("CREATE TABLE IF NOT EXISTS Number_data(Ra_Regno TEXT)")
        # while endnumber <= 26000:
        #     url='http://openapi.seoul.go.kr:8088/6a5a6f6e496d636835324e436c6870/xml/landBizInfo/'+str(startnumber)+'/'+str(endnumber)+'/'
        #     # HTTP GET Request
        #     req = requests.get(url)
        #     # html 소스 가져오기
        #     html = req.text
        #     # HTTP Header 가져오기 
        #     # header = req.headers
        #     # HTTP Status 가져오기 (200 : 정상)
        #     # status = req.status_code

        #     ## BeautifulSoup으로 html소스를 python객체로 변환
        #     ## 첫 인자는 html소스코드, 두 번째 인자는 어떤 parser를 이용할지 명시.
        #     ## Python 내장 html.parser를 이용
        #     soup = BeautifulSoup(html,'html.parser')
        #     # select = soup.select('div.collapsible > div.expanded > div.collapsible-content > div:nth-child(20) > span.text')
        #     for code in soup.findAll('ra_regno'):
        #         Ra_Regno.extend(code)
        #     if arr_end >= 25453:
        #         arr_end = 25453
        #     for i in range(arr_start,arr_end):
        #         print(Ra_Regno[i])
        #         cur.execute("INSERT OR IGNORE INTO Number_data(Ra_Regno) VALUES (?)",(Ra_Regno[i],))
        #         conn.commit()
        #     startnumber += 1000
        #     endnumber += 1000
        #     arr_start += 1000
        #     arr_end += 1000
        # conn.close()
        Islogin = dict()
        if 'id' in session:
            print(session)
            sessionID = session['id']
            Islogin['loginresult'] = sessionID
            return Islogin
        else:
            Islogin['loginresult'] = False
            return Islogin
    return Islogin
@app.route('/logout')
@cross_origin(supports_credentials=True) 
def logout():
    if request.method == 'GET':
        # 세션 제거
        session.pop('id', None)
        return ''
# 조회수 순위에서 해당 제목을 클릭했을때
@app.route('/ranking',methods=['GET', 'POST'])
def ranking():
    if request.method == 'POST':
        # 랭킹을 불러온후
        selectRankingTitle = request.json.get('ranking')
        # db연결 제목이 랭킹에 있는 제목과 일치하는 글번호를 불러온다
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        cur.execute('select listnum from writeDB where title=?',(selectRankingTitle))
        SelectTitle = cur.fetchone()
        conn.close()
        selectTitledict = dict()
        selectTitledict['rankingtitle'] = SelectTitle
        return selectTitledict
@app.route('/delete',methods=['GET', 'POST'])
def excutedelete():
    if request.method == "POST":
        commentText = request.json.get("commentText")
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        cur.execute("delete from comment where commentText=?",(commentText,))
        conn.commit()
        conn.close()
    return "답변을 삭제하였습니다."
@app.route('/update',methods=['GET', 'POST'])
def executeupdate():
    if request.method == "POST":
        oldText = request.json.get("oldText")
        updateText = request.json.get("updateText")
        conn = sqlite3.connect('writelist.db')
        cur = conn.cursor()
        # comment 테이블 안 새로운 값을 set해주는데 기존에 있는 텍스트의 어트리뷰트일때
        cur.execute("update comment set commentText=? where commentText=?",(updateText,oldText))
        conn.commit()
        conn.close()
    return "수정되었습니다."



if __name__ == '__main__':
    app.run(debug=True)