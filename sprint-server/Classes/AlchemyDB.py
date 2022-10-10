from sqlalchemy import Column, Integer, ForeignKey, String, Text, Sequence, VARCHAR, TIMESTAMP, create_engine
from sqlalchemy.orm import declarative_base
from flask_sqlalchemy import SQLAlchemy
import os
MYSQLUSER='Application'
MYSQLPASSWORD="FlaskApp"
MYSQLHOST="127.0.0.1"
MYSQLDATABASE="sprint_board_db_dev"
SQLALCHEMY_DATABASE_URI = f'mysql://{MYSQLUSER}:{MYSQLPASSWORD}@{MYSQLHOST}/{MYSQLDATABASE}'

db = SQLAlchemy()
    

class Card(db.Model):
    __tablename__ = "Card"
    card_id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String)
    status = Column(Integer)
    employees = db.relationship("CardEmployee", backref="employees", lazy='select', viewonly=True)

    def to_json(self):

        return {
            "card_id": self.card_id,
            "title": self.title,
            "body": self.body,
            "status" : self.status,
            "employees": [ 
                            {"employee_id": a.employee.employee_id, "first_name": a.employee.first_name, 
                            "last_name": a.employee.last_name, "email": a.employee.email, "logo": a.employee.logo} 
                        for a in self.employees] if self.employees else None,
        }


class Employee(db.Model):
    __tablename__ = "Employee"
    employee_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    logo = Column(String)

    def to_json(self):
        return {
        }


class CardEmployee(db.Model):
    __tablename__ = "CardEmployee"
    card_employee_id = Column(Integer, primary_key=True)
    card_id = Column(Integer, db.ForeignKey('Card.card_id'))
    employee_id = Column(Integer, db.ForeignKey('Employee.employee_id'))
    card = db.relationship("Card", backref="Card", lazy='select')
    employee = db.relationship("Employee", backref="Employee", lazy='select')

    def to_json(self):
        return {
        }


class BoardSection(db.Model):
    __tablename__ = "BoardSection"
    board_section_id = Column(Integer, primary_key=True)
    title = Column(String)
    board_id = Column(Integer, db.ForeignKey('Board.board_id'))
    cardRecords = db.relationship("CardCalender", backref="CardCalender", lazy='select')

    def to_json(self):

        return {
            "board_section_id": self.board_section_id,
            "title": self.title,
            "board_id" : self.board_id,
            "cards": [ 
                            { "card_id": a.card.to_json()["card_id"], "title": a.card.to_json()["title"], "body" : a.card.to_json()["body"],
                                "status" : a.card.to_json()["status"], "employees" : a.card.to_json()["employees"]} 
                        for a in self.cardRecords] if self.cardRecords else None,
        }


class Board(db.Model):
    __tablename__ = "Board"
    board_id = Column(Integer, primary_key=True)
    name = Column(String)
    start_date = Column(TIMESTAMP)
    logo = Column(String)

    def to_json(self):

        board_sections = []
        for a in self.board_sections:
            board_sections.append(a.to_json())

        return {
            "board_id": self.board_id,
            "name": self.name,
            "start_date" : self.start_date,
            "logo": self.logo,
            "board_sections" : board_sections
        }

class BoardEmployee(db.Model):
    __tablename__ = "BoardEmployee"
    board_employee_id = Column(Integer, primary_key=True)
    board_id = Column(Integer, db.ForeignKey('Board.board_id'))
    employee_id = Column(Integer, db.ForeignKey('Employee.employee_id'))
    hours_weekly = Column(Integer)
    
    def to_json(self):
        return {
        }

class CardCalender(db.Model):
    __tablename__ = "CardCalender"
    card_calender_id = Column(Integer, primary_key=True)
    sprint_number = Column(String)
    board_section_id = Column(Integer, db.ForeignKey('BoardSection.board_section_id'))
    card_id = Column(Integer, db.ForeignKey('Card.card_id'))
    card = db.relationship("Card", backref="CalenderCard", lazy='select')    
    board_sections = db.relationship("BoardSection", backref="BoardSection", lazy='select')  

    def to_json(self):
        return {
        }



class SprintBoard():

    def __init__(self, board_id, sprint_number):
        self.cc = CardCalender.query.filter_by(sprint_number=sprint_number)

    def to_json(self):
        print(self.cc)
        return {
        }