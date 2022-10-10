from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
import os


MYSQLUSER='Application'
MYSQLPASSWORD="FlaskApp"
MYSQLHOST="127.0.0.1"
MYSQLDATABASE="sprint_board_db_dev"
SQLALCHEMY_DATABASE_URI = f'mysql://{MYSQLUSER}:{MYSQLPASSWORD}@{MYSQLHOST}/{MYSQLDATABASE}'
SQLALCHEMY_TRACK_MODIFICATIONS = False
# mysqlHost = os.environ.get('MYSQLHOST')
# mysqlDatabase = os.environ.get('MYSQLDATABASE')
# mysqlUser = os.environ.get('MYSQLHOST')
# mysqlPass = password=os.environ.get('MYSQLPASSWORD')


