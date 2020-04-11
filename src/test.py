from flask import Flask,url_for,request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('C:/Database/test.db')
print ("Opened database successfully")
cur = conn.cursor()
cur.execute("select * from signup")
data = cur.fetchall()
print(type(data))
print(*data, sep="\n")
print(len(data[len(data)-1]))

@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return "이것은 login post메소드 호출"
    else:
        return "이것은 login get메소드 호출"

@app.route('/showclass', methods=['GET', 'POST'])
def showclass():
    if request.method == 'GET':
        conn = sqlite3.connect('C:/Database/test.db')
        print ("Opened database successfully")
        cur = conn.cursor()
        cur.execute("select * from signup")
        data = cur.fetchall()
        print(data)
        for row in data:
            print(row)
            return str(row)

        
if __name__ == '__main__':
    app.run(debug=True)