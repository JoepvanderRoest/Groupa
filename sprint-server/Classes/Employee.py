import string
from Classes.MysqlConnection import mysqlConnection

class employee(mysqlConnection):

    def __init__(self, employee_id=int, first_name=str, last_name=str, email=str, logo=str):
        self.employee_id = employee_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.logo = logo

    def load_employee(self):
        result = self.fetchresults("SELECT first_name, last_name FROM Employee WHERE employee_id = {employee_id}".format(employee_id=str(self.employee_id)))
        self.first_name = result[0]["first_name"]
        self.last_name = result[0]["last_name"]
        self.email = result[0]["email"]
        # self.employees = employees




