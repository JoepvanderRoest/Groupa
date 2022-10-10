from sqlalchemy import Column, Integer, String
from MySqlAlchemy import mysqlConnection
import sqlalchemy as db

class CardAlch(mysqlConnection):
    __tablename__ = "Card"
    card_id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String)
    

    def __repr__(self):
        return "<Card(card_id='%s', fullname='%s', body='%s')>" % (
            self.card_id,
            self.title,
            self.body,
        )