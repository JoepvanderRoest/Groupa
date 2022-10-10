from AlchemyDB import db, Card
from app import app

with app.app_context():
    def main():
        c1 = Card("Card Test", "via Alchemy :-)")
        print(c1.to_json())
        db.session.add(c1)
        db.session.commit
        exit()
        db.load_tables()
        CursorResult = db.connection.execute(db.cardTable)
        ResultSet = CursorResult.fetchall()
        print(ResultSet)
        print(ResultSet)
main()