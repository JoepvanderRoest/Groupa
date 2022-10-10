import mysql.connector
from mysql.connector import Error
import os

class mysqlConnection:

    def connect(self):
        try:
            connection = mysql.connector.connect(host=os.environ.get('MYSQLHOST'),
                                        database=os.environ.get('MYSQLDATABASE'),
                                        user=os.environ.get('MYSQLUSER'),
                                        password=os.environ.get('MYSQLPASSWORD'))
            return connection
        except Error as e:
            print("Error while connecting to MySQL", e)
            return

    def update(self, sql, val=[]):
        connection = self.connect()
        cursor = connection.cursor()
        cursor.execute(sql, val)
        connection.commit()
        cursor.close()
        connection.close()

    def fetchresults(self, sql, val=[]):
        connection = self.connect()
        cursor = connection.cursor()
        cursor.execute(sql, val)
        records = cursor.fetchall()
        field_names = [i[0] for i in cursor.description]
        result = []
        for row in records:
            columnvalues = dict()
            for index, column in enumerate(row):
                columnvalues.update({str(field_names[index]): str(column)})
            result.append(
                columnvalues
            )
        cursor.close()
        connection.close()
        return result
