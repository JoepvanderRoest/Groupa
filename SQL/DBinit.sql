USE sprint_board_db_dev;

DROP TABLE IF EXISTS BoardEmployee;
DROP TABLE IF EXISTS CardEmployee;
DROP TABLE IF EXISTS CardCalender;
DROP TABLE IF EXISTS boardSection;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Card;
DROP TABLE IF EXISTS Board;
DROP TABLE IF EXISTS Calender;
DROP TABLE IF EXISTS numbers_small;
DROP TABLE IF EXISTS numbers;

CREATE TABLE Employee(
employee_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(150),
email VARCHAR(200),
logo VARCHAR(200)
);
INSERT INTO Employee(first_name, last_name, email, logo) VALUES ("Joep", "van der Roest", "joep.van.der.roest@gmail.com", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Eo_circle_blue-grey_letter-j.svg/2048px-Eo_circle_blue-grey_letter-j.svg.png")
															,("Test", "de Tester", "joep.van.der.roest@gmail.com","https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Eo_circle_grey_letter-e.svg/768px-Eo_circle_grey_letter-e.svg.png");

CREATE TABLE Card(
card_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100),
body TEXT,
status BOOL
);
INSERT INTO Card(title, body, status) 
VALUES ("Card1", "test text voor de kaart", FALSE ),
("Card2", "test text voor de kaart, lorem ipsum enzo, dit is een langere kaart met meer info", FALSE ),
("Card3", "test text voor de kaart", FALSE );


CREATE TABLE Board(
board_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(200),
start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
logo VARCHAR(250)
);
INSERT INTO Board(name, logo) 
VALUES ("testBoard1", "https://static.vecteezy.com/ti/gratis-vector/t2/6607754-mooie-pauw-cartoon-illustratie-geisoleerd-op-witte-achtergrond-vector.jpg"),
		("testBoard2", "https://i.pinimg.com/736x/a9/92/62/a99262b3a04ce4974bc8aea648853fe4.jpg");

CREATE TABLE boardSection(
board_section_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100),
board_id INT,
FOREIGN KEY (board_id) REFERENCES Board(board_id)
ON DELETE CASCADE
);
INSERT INTO boardSection(title, board_id) 
VALUES ("Test", 1 ),
("Production", 1 ),
("Tested", 1 );


CREATE TABLE BoardEmployee(
board_employee_id INT AUTO_INCREMENT PRIMARY KEY,
board_id INT,
employee_id INT,
hours_weekly INT,
FOREIGN KEY (board_id) REFERENCES Board(board_id)
ON DELETE CASCADE,
FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
ON DELETE CASCADE
);
INSERT INTO BoardEmployee(board_id, employee_id, hours_weekly) VALUES (1, 1, 40), (1, 2, 40);

CREATE TABLE CardEmployee(
card_employee_id INT AUTO_INCREMENT PRIMARY KEY,
card_id INT,
employee_id INT,
FOREIGN KEY (card_id) REFERENCES Card(card_id)
ON DELETE CASCADE,
FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
ON DELETE CASCADE
);

CREATE TABLE numbers_small (number INT);
INSERT INTO numbers_small VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9);

CREATE TABLE numbers (number BIGINT);
INSERT INTO numbers
SELECT thousands.number * 1000 + hundreds.number * 100 + tens.number * 10 + ones.number
FROM numbers_small thousands, numbers_small hundreds, numbers_small tens, numbers_small ones
LIMIT 1000000;

CREATE TABLE Calender (
date             DATE NOT NULL PRIMARY KEY,
year             INT,
month            CHAR(10),
month_of_year    CHAR(2),
day_of_month     INT,
day              CHAR(10),
day_of_week      INT,
weekend          CHAR(10) NOT NULL DEFAULT "Weekday",
day_of_year      INT,
week_of_year     CHAR(2),
sprint_number  INT,
quarter  INT,
previous_day     date NOT NULL default '0000-00-00',
next_day         date NOT NULL default '0000-00-00',
UNIQUE KEY `date` (`date`));

-- First populate with ids and Date
-- Change year start and end to match your needs. The above sql creates records for year 2010.
INSERT INTO Calender (date)
SELECT DATE_ADD( '2014-01-01', INTERVAL number DAY )
FROM numbers
WHERE DATE_ADD( '2022-01-01', INTERVAL number DAY ) BETWEEN '2022-01-01' AND '2039-12-31'
ORDER BY number;

-- Update other columns based on the date.
UPDATE calender SET
year            = DATE_FORMAT( date, "%Y" ),
month           = DATE_FORMAT( date, "%M"),
month_of_year   = DATE_FORMAT( date, "%m"),
day_of_month    = DATE_FORMAT( date, "%d" ),
day             = DATE_FORMAT( date, "%W" ),
day_of_week     = DAYOFWEEK(date),
weekend         = IF( DATE_FORMAT( date, "%W" ) IN ('Saturday','Sunday'), 'Weekend', 'Weekday'),
day_of_year     = DATE_FORMAT( date, "%j" ),
week_of_year    = DATE_FORMAT( date, "%V" ),
sprint_number    = FLOOR(EXTRACT(week FROM DATE_ADD(date, INTERVAL -3 DAY)) / 2) ,
quarter         = QUARTER(date),
previous_day    = DATE_ADD(date, INTERVAL -1 DAY),
next_day        = DATE_ADD(date, INTERVAL 1 DAY);

DROP TABLE IF EXISTS numbers;
DROP TABLE IF EXISTS numbers_small;

CREATE TABLE cardCalender(
card_calender_id INT AUTO_INCREMENT PRIMARY KEY,
sprint_number VARCHAR(7),
board_section_id INT,
card_id INT,
FOREIGN KEY (board_section_id) REFERENCES BoardSection(board_section_id)
ON DELETE CASCADE,
FOREIGN KEY (card_id) REFERENCES Card(card_id)
ON DELETE CASCADE
);

#INITIAL INSERTS
                                                        
INSERT INTO BoardEmployee(board_id, employee_id, hours_weekly) VALUES (1, 1, 40), (1, 2, 40);
INSERT INTO CardEmployee(card_id, employee_id) VALUES (1, 1), (2, 1), (3,1), (1,2);
INSERT INTO CardCalender(sprint_number, board_section_id, card_id) VALUES('18', '1' ,'1'),
														('18', '1' ,'2'),
														('18', '2' ,'3'),
                                                        ('19', '2' , '2');