from Classes.MysqlConnection import mysqlConnection
from Classes.Employee import employee
class card(mysqlConnection):

    def __init__(self, card_id=int, title=int, body=str, status=bool, board_section_id=int, employees=[]):
        self.card_id = card_id
        self.title = title
        self.body = body
        self.status = status
        self.board_section_id = board_section_id
        self.employees = employees

    def get_card(self):
        emploArray = []
        for emp in self.employees: 
            emploArray.append(emp.__dict__)
        self.employees = emploArray
        return(self.__dict__)

    def save_card(self, sprint_number):
        self.update("UPDATE Card SET title = '{title}', body = '{body}', status = {status} WHERE card_id = {card_id}".format(board_section_id=str(self.board_section_id), title = self.title, body= self.body, status = self.status, card_id=self.card_id))
        self.update("UPDATE cardcalender SET board_section_id = {board_section_id} WHERE card_id = {card_id} AND sprint_number = '{sprint_number}'".format(board_section_id=self.board_section_id,card_id=self.card_id,sprint_number=sprint_number))
    def load_employees(self):
        self.employees = []
        employees = self.fetchresults("SELECT employee_id, first_name, last_name, email, logo FROM Employee WHERE employee_id IN(SELECT employee_id FROM CardEmployee WHERE card_id = {card_id})".format(card_id = self.card_id))
        for emp in employees:
            self.employees.append(employee(employee_id=emp["employee_id"], first_name=emp["first_name"], last_name=emp["last_name"], email=emp["email"], logo=emp["logo"]))
        

