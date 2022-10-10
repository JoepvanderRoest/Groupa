from Classes.MysqlConnection import mysqlConnection
from Classes.Employee import employee
from Classes.BoardSection import boardSection
from datetime import datetime

class board(mysqlConnection):

    def __init__(self, board_id=int, board_sections=[] , employees=[], start_date=str, name=str, logo=str, sprint_number=str):
        self.board_id = board_id
        self.employees = employees
        self.board_sections = board_sections
        self.start_date = start_date
        self.name = name
        self.logo = logo
        self.sprint_number = sprint_number

    def get_board_info(self):
        return {"board_id" : self.board_id, "name" : self.name, "start_date" : self.start_date, "employee_count" : len(self.employees), "logo" : self.logo}

    def objlist_to_json(self, object_list):
        jsonArr = []
        for obj in object_list:
            jsonArr.append(obj.__dict__)
        return jsonArr

    def get_employees(self):
        return self.objlist_to_json(self.employees)

    def load_board(self, board_id, sprint_number):
        self.board_id = board_id
        self.sprint_number = sprint_number
        result = self.fetchresults("SELECT board_id, name, start_date, logo FROM Board WHERE board_id = {board_id}".format(board_id=str(board_id)))
        employees = self.fetchresults("SELECT E.employee_id ,E.first_name, E.last_name, E.email, E.logo FROM BoardEmployee BE LEFT JOIN Employee E ON BE.employee_id = E.employee_id WHERE board_id = {board_id}".format(board_id=str(board_id)))
        boardsections = self.fetchresults("SELECT board_section_id, title FROM boardSection b WHERE board_id = {board_id}".format(board_id=str(board_id)))
        self.employees = []
        for emp in employees:
            employ = employee(emp["employee_id"], emp["first_name"], emp["last_name"], emp["email"], emp["logo"])
            self.employees.append(employ)

        self.board_sections = []
        for bs in boardsections:
            boardSec = boardSection(bs["board_section_id"], self.board_id, bs["title"], sprint_number)
            self.board_sections.append(boardSec)

        self.start_date = result[0]["start_date"]
        self.name = result[0]["name"]
        self.logo = result[0]["logo"]

    def get_board(self):
        if type(self.board_sections[0]) is not dict: #<class 'dict'>
            employeesJson = []
            boardSectionJson = []
            
            for emp in self.employees:
                employeesJson.append(emp.__dict__)

            for boardSection in self.board_sections:
                boardSection.load_board_cards(self.sprint_number)
                boardSectionJson.append(boardSection.get_boardSection())
        else:
            employeesJson = self.employees
            boardSectionJson =  self.board_sections 
        return {"board_id" : self.board_id, "name" : self.name, "start_date" : self.start_date, "employees" : employeesJson, "board_sections" : boardSectionJson ,"logo" : self.logo} 


    def save_board(self):
        #try:
            self.update("UPDATE Board SET name = '{name}', start_date = '{start_date}', logo = '{logo}' WHERE board_id = {board_id}".format(board_id=str(self.board_id), name=str(self.name), start_date=str(self.start_date), logo=str(self.logo)))
            for bs in self.board_sections:
                board_section = boardSection(bs["board_section_id"], self.board_id, bs["title"], bs["cards"], self.sprint_number)
                board_section.save_board_section()
            return "Succes"
        # except Exception as err:
        #     print(err)
        #     return "Failure"
                
            