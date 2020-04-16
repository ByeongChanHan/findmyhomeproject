from flask import Flask,url_for,request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return "이것은 login post메소드 호출"
    else:
        return "이것은 login get메소드 호출"

<<<<<<< HEAD
@app.route('/showclass', methods=['GET', 'POST'])
=======
@app.route('/ask', methods=['GET', 'POST'])
>>>>>>> 691b54ad874eb4185ca4ba239ea783cc29f31ab0
# http:localhost:3000/showclass에서 get으로 요청하면 5000/showclass로 요청 들어옴
def showclass():
    # 5000으로 route받았으면 해당 함수 실행
    if request.method == 'GET':
        # 요청메소드가 GET방식이면
        conn = sqlite3.connect('test.db')
        # DB경로 써준후 connect함수로 연결
        print ("Opened database successfully")
        cur = conn.cursor()
        # 데이터베이스 접근한 변수를 셋팅(커서) 그 이름은 cur
        cur.execute("select * from signup")
        # sql문 실행
        data = cur.fetchall()
        # 실행하고 난 결과값을 fetchall(전부 선택)해서 data변수에 저장
        print(type(data))
        # 타입값 LIST형식
        result=""
        # 결과값은 문자열 빈칸으로 초기화
        for row in data:
        # 모든 데이터를 가지고있는 data변수는 row에 for문으로 하나씩 다 넣고
            for data_index in range(len(row)):
                # 한 행의 길이만큼을 data_index변수에 저장한다(data_index는 정수)
                print(row[data_index])
                # row의 길이만큼 출력
                result += str(row[data_index])+" "
                # str함수로 문자열 변환하고 위에 있는 result에 저장
                # 뒤에 " "는 데이터끼리 공백주려고 쓰는거
        conn.close()
        # db를 닫아주고
        return result
        # 이어 붙인 문자열을 리턴

        
if __name__ == '__main__':
    app.run(debug=True)