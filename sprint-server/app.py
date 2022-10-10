from flask import *
import flask as f
from flask import jsonify
from flask import request
from json import *
from flask_cors import CORS, cross_origin
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy 
from Classes.Board import board
from Classes.MysqlConnection import mysqlConnection
from Classes.AlchemyDB import db, Card, CardCalender, BoardSection, Board, SprintBoard

app = f.Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://Application:FlaskApp@127.0.0.1/sprint_board_db_dev'
db.init_app(app)
app.app_context().push()


def makeReadyForReact(result):
    with app.app_context():
        json = jsonify(result)
        json.headers.add('Access-Control-Allow-Origin', '*')
        return json

@app.route('/get_all_boards')
def get_all_boards():
    connection = mysqlConnection()
    results = connection.fetchresults("SELECT board_id FROM Board")
    boardList = []
    for res in results:
         b = board(res['board_id'])
         boardList.append(b.get_board_info())
    return makeReadyForReact(boardList)


@app.route('/get_board/<board_id>/<sprint_number>')
def get_board(board_id, sprint_number):
    b = get_board(board_id, sprint_number)
    b = board()
    b.load_board(board_id, sprint_number)
    # ctx = app.app_context()
    # g.board = b
    # ctx.push()
    return makeReadyForReact(b.get_board())

@app.route("/save_board", methods=["POST"], strict_slashes=False)
def save_board():
    boardJson = request.json['board']
    sprint = request.json['sprint_number']
    print(boardJson)
    b = board(boardJson["board_id"], boardJson["board_sections"], boardJson["employees"], boardJson["start_date"] ,boardJson["name"], boardJson["logo"], sprint)
    b.get_board()
    b.save_board()
    return makeReadyForReact("Succes")

@app.route("/get_employees/<board_id>/<sprint_number>")
def get_employees(board_id, sprint_number):
    #print(g.board)
    b = board()
    b.load_board(board_id, sprint_number)
    return makeReadyForReact(b.get_employees())

@app.route("/sprint_number/<date>")
def get_sprint_number(date):
    dt = datetime.strptime(date, '%Y-%m-%d')
    year = dt.year
    con = mysqlConnection()
    result = con.fetchresults("SELECT sprint_number, MAX(CASE WHEN date = {date} THEN 1 ELSE 0 END) AS presentSprint FROM calender WHERE year IN ({year}, {yearprev}, {yearnext}) GROUP BY sprint_number".format(year={year},yearprev={year+1},yearnext={year-1},date={dt}))
    print(result)
    return makeReadyForReact(result)

@app.route("/save_card/<card_id>")
def save_card(title, body, status):
    c = Card(title=title, body=body, status=status)
    db.session.add(c)
    db.session.commit()
    return makeReadyForReact(c)

@app.route("/select_card/<card_id>")
def select_card(card_id):
    c = Card.query.get(card_id)
    return makeReadyForReact(c.to_json())

@app.route("/select_cards/<board_section_id>/<sprint_number>")
def select_cards(board_section_id, sprint_number):
    cardRecords = CardCalender.query.filter_by(board_section_id=str(board_section_id,sprint_number=sprint_number)).all()
    cards = []
    for cardRecord in cardRecords:
        cards.append(cardRecord.card.to_json())
    return makeReadyForReact(cards)

#@app.route("/select_board_section/<board_id>")
def select_board_section(board_id):
    bs = BoardSection().query.get(board_id)
    return bs.to_json()

#@app.route("/select_board/<board_id>")
def select_board(board_id, sprint_number):
    c = SprintBoard(board_id, sprint_number)
    print(c.to_json())
    exit()
    print(b.to_json())

if __name__ == '__main__':
    select_board(1,"2022-18")
    #app.run()
