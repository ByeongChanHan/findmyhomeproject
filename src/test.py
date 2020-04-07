from flask import Flask,url_for,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return "이것은 login post메소드 호출"
    else:
        return "이것은 login get메소드 호출"

@app.route('/showclass', methods=['GET', 'POST'])
def showclass():
    if request.method == 'POST':
        return "이것은 class post메소드 호출"
    else:
        return "이것은 class get메소드 호출"

if __name__ == '__main__':
    app.run(debug=True)