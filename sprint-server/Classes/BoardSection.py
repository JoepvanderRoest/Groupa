from re import S
from unicodedata import name
from Classes.MysqlConnection import mysqlConnection
from Classes.Employee import employee
from Classes.Card import card

class boardSection(mysqlConnection):

    def __init__(self, board_section_id=int, board_id=int, title=str, cards=[], sprint_number=str):
        self.board_section_id = board_section_id
        self.board_id = board_id
        self.title = title
        self.cards = cards
        self.sprint_number = sprint_number


    def get_cards(self):
        cards = []
        for cardres in self.cards:
            cards.append(cardres.__dict__)
        return cards

    def load_board_cards(self, sprint_number):
        self.cards = []
        self.sprint_number = sprint_number
        cardResult = self.fetchresults("""SELECT c.card_id, c.title, body, status, bs.board_section_id FROM Card c 
            LEFT JOIN cardCalender cc ON c.card_id = cc.card_id AND cc.board_section_id = {board_section_id}
            LEFT JOIN boardSection bs ON bs.board_section_id = CC.board_Section_id
            WHERE cc.sprint_number = "{sprint_number}" ;""".format(sprint_number=str(sprint_number), board_section_id=self.board_section_id))
        for cardres in cardResult:
            self.cards.append(card(cardres["card_id"], cardres["title"], cardres["body"], cardres["status"], cardres["board_section_id"]))

    def get_boardSection(self):
        cardsJson = []
        for card in self.cards:
            card.load_employees()
            cardsJson.append(card.get_card())
        return {"board_section_id" : self.board_section_id, "title" : self.title, "cards" : cardsJson}

    def save_board_section(self):
        self.update("UPDATE BoardSection SET title = '{title}' WHERE board_section_id = {board_section_id}".format(board_section_id=str(self.board_section_id), title = self.title))
        for ca in self.cards:
            c = card(card_id=ca["card_id"], title=ca["title"], body=ca["body"], status=ca["status"], board_section_id=ca["board_section_id"])
            c.save_card(self.sprint_number)
            print("gelukt!")
