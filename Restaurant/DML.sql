-- -- manager has id as 100000
-- -- kichenstaff has id as 100
-- -- delivery person id starts from 1000
-- -- grocery item id start with 200
-- -- recipe id start from 10
-- -- table id start from 60
-- -- order id online start from 100000
-- -- order id dinein start from 500000
-- -- address id start from 700

-- we havent yet included table booking by phone, orders by phone. 
-- To do table_booking_phone => table_booking_by_phone, order_dinein_by_phone
-- To do orders_phone => orders_by_phone
DROP TABLE IF EXISTS ORDER_CONTENTS_DINEIN;
DROP TABLE IF EXISTS ORDERS_DINEIN;
DROP TABLE IF EXISTS CART;
DROP TABLE IF EXISTS TABLE_CART;
DROP TABLE IF EXISTS ORDER_CONTENTS_ONLINE;
DROP TABLE IF EXISTS ORDERS_ONLINE;
DROP TABLE IF EXISTS RECIPE_INGRIDIENTS;
DROP TABLE IF EXISTS GROCERY_ITEM_HISTORY;
DROP TABLE IF EXISTS TABLE_BOOKINGS;
DROP TABLE IF EXISTS TABLES;
DROP TABLE IF EXISTS MENU_RECIPE;
DROP TABLE IF EXISTS GROCERY_ITEM;
DROP TABLE IF EXISTS KITCHEN_STAFF;
DROP TABLE IF EXISTS DELIVERY_PERSON;
DROP TABLE IF EXISTS CUSTOMER;
DROP TABLE IF EXISTS ADDRESSES;

CREATE TABLE ADDRESSES(
	addr_id					int NOT NULL, -- start 700 jump 1
	name					varchar(2) NOT NULL,-- for only limited possibilities
	time_from_restaurant	int NOT NULL, -- start 10 jump 5
	primary key(addr_id)
);

CREATE TABLE CUSTOMER(
	customer_id 	int NOT NULL, -- 5 digit number  -- start 100000 jump 4
	name 			text NOT NULL, --  can have spaces
	phone 			char(10) , -- only 10 digits(stored as char since no need to waste memory)
	password 		char(10) NOT NULL, -- Use Bcrypt to convert a password to hash
	email 			VARCHAR(320) NOT NULL UNIQUE,-- @gmail.com
	address 		int NOT NULL, 
	primary key (customer_id),
	foreign key (address) references ADDRESSES
);


CREATE TABLE DELIVERY_PERSON(
	delivery_person_id 		int NOT NULL, -- starts from 1000  -- start 1000 jump 1  
	name 					text NOT NULL, --  can have spaces
	phone 					char(10), -- only 10 digits(stored as char since no need to waste memory)
	password 				char(10) NOT NULL,
	email 					VARCHAR(320) NOT NULL UNIQUE, -- @gmail.com
	-- address char(1); -- A,B,C,D,E
	primary_address 		int NOT NULL,
	secondary_address 		int NOT NULL, -- both must not be same
	availability			varchar(4) default 'free' check(availability in ('out','free','delivered')), -- check (out, free)
	primary key (delivery_person_id),
	foreign key (primary_address) references ADDRESSES,
	foreign key (secondary_address) references ADDRESSES
);

CREATE TABLE PENDING_DELIVERY_PERSON(
	delivery_person_id 		int NOT NULL, -- starts from 1000  -- start 1000 jump 1  
	name 					text NOT NULL, --  can have spaces
	phone 					char(10), -- only 10 digits(stored as char since no need to waste memory)
	password 				char(10) NOT NULL,
	email 					VARCHAR(320) NOT NULL UNIQUE, -- @gmail.com
	-- address char(1); -- A,B,C,D,E
	primary_address 		int NOT NULL,
	secondary_address 		int NOT NULL, -- both must not be same
	status       			varchar(8) default 'pending' check(status in ('pending','rejected')),
	-- availability			varchar(4) default 'free' check(availability in ('out','free','delivered')), -- check (out, free)
	primary key (delivery_person_id),
	foreign key (primary_address) references ADDRESSES,
	foreign key (secondary_address) references ADDRESSES
);

CREATE TABLE KITCHEN_STAFF(
	kitchen_staff_id	int NOT NULL, -- start 100 jump 1
	name				text NOT NULL,
	phone				char(10),
	password			char(10) NOT NULL,
	email				VARCHAR(320) NOT NULL UNIQUE,
	primary key(kitchen_staff_id)
);


CREATE TABLE GROCERY_ITEM(
	item_id		int NOT NULL, -- start 200 jump 1
	name		text NOT NULL,
	quantity	int check(quantity >= 0) DEFAULT 1, --  >= 0
	primary key(item_id)
);

CREATE TABLE MENU_RECIPE(
	recipe_id		int NOT NULL, -- start 10 jump 1
	name			text NOT NULL,
	status			varchar(13) DEFAULT 'available' check(status in ('available','not_available')),-- forgot what it is?
	category		varchar(11) check(category in ('dessert','starters','main_course',NULL)),-- check (Dessert, Starters, Main course)
	price			int check(price >= 1),
	primary key(recipe_id)
);

CREATE TABLE TABLES(
	table_id 		int NOT NULL,  -- start 60 jump 1
	seater			int NOT NULL check(seater >= 1),
	slot1_status	varchar(10) DEFAULT 'not_booked' check(slot1_status in('booked','not_booked')),
	slot2_status	varchar(10) DEFAULT 'not_booked' check(slot2_status in('booked','not_booked')),
	slot3_status	varchar(10) DEFAULT 'not_booked' check(slot3_status in('booked','not_booked')),
	primary key(table_id)
);

CREATE TABLE TABLE_BOOKINGS(
	customer_id		int NOT NULL,
	table_id		int NOT NULL,
	slot_no			int NOT NULL, -- 1->7-10 2->12-3 3->7-10
	time_date		date,
	primary key(customer_id,table_id,time_date,slot_no), 
	foreign key(customer_id) references CUSTOMER,
	foreign key(table_id) references TABLES
);

CREATE TABLE GROCERY_ITEM_HISTORY(
	item_id					int NOT NULL,
	updated_quantity		int DEFAULT 1 check(updated_quantity >= 0),
	updated_time			timestamp NOT NULL,
	primary key(item_id,updated_time),
	foreign key(item_id) references GROCERY_ITEM
);


CREATE TABLE RECIPE_INGRIDIENTS(
	recipe_id 		int NOT NULL,
	item_id			int NOT NULL,
	primary key(recipe_id,item_id),
	foreign key(recipe_id) references MENU_RECIPE,
	foreign key(item_id) references GROCERY_ITEM
);

CREATE TABLE ORDERS_ONLINE(
	-- order_type 				text; -- only 3 possibilities 
	order_id  				int NOT NULL, -- start 1000000 jump 1
	customer_id 			int NOT NULL,-- if manager books its manger_id
	delivery_person_id 		int,
	order_desc 				text DEFAULT NULL,
	status					varchar(9) DEFAULT 'preparing' check(status in ('preparing','prepared','out','delivered')), -- only three possibilities(confirmed, prepared, delivered)
	order_dest				int NOT NULL,--  check(order_dest in ('A','B','C','D','E')), -- can only be A,B,C,D,E or null
	delivery_out_time		timestamp,-- why because backend allocation of delivery guys when an order is prepared
	
	primary key(order_id),
	foreign key(delivery_person_id) references DELIVERY_PERSON,
	foreign key(customer_id) references CUSTOMER,
	foreign key(order_dest) references ADDRESSES

);

CREATE TABLE ORDER_CONTENTS_ONLINE(
	order_id		int NOT NULL,
	recipe_id		int NOT NULL,
	quantity 		int DEFAULT 1 check(quantity >= 1),
	primary key(order_id,recipe_id),
	foreign key(order_id) references ORDERS_ONLINE,
	foreign key(recipe_id) references MENU_RECIPE
);

CREATE TABLE CART(
	customer_id		int NOT NULL,	
	recipe_id		int NOT NULL,
	quantity 		int DEFAULT 1 check(quantity >= 1), -- >=1 -- CART can also be empty;
					     -- whenever customer presses buy option cart goes empty;
	primary key(customer_id,recipe_id),
	foreign key(customer_id) references CUSTOMER,
	foreign key(recipe_id) references MENU_RECIPE
);

CREATE TABLE TABLE_CART(
	table_id		int NOT NULL,
	recipe_id 		int NOT NULL,
	quantity 		int DEFAULT 1 check(quantity>=1),
	primary key(table_id, recipe_id),
	foreign key(table_id) references TABLES,
	foreign key(recipe_id) references MENU_RECIPE
);

CREATE TABLE ORDERS_DINEIN(
	order_id  				int NOT NULL, -- start 500000 jump 1
	customer_id 			int NOT NULL,-- if manager books its manger_id
	table_id				int NOT NULL,
	slot_no					int NOT NULL check(slot_no in (1,2,3)),
	time_date				date,
	order_desc 				text DEFAULT NULL,
	status					varchar(9) DEFAULT 'preparing' check(status in ('preparing','out','finished')), -- only three possibilities(confirmed, prepared, delivered)
	
	primary key(order_id)
);

CREATE TABLE ORDER_CONTENTS_DINEIN(
	order_id		int NOT NULL,
	recipe_id		int NOT NULL,
	quantity 		int DEFAULT 1 check(quantity >= 1),
	primary key(order_id,recipe_id),
	foreign key(order_id) references ORDERS_DINEIN,
	foreign key(recipe_id) references MENU_RECIPE
);



CREATE INDEX "customer.userid"
	ON customer 
	USING btree
	(customer_id);

CREATE INDEX "DELIVERY_PERSON.delivery_person_id"
	ON DELIVERY_PERSON
	USING btree 
	(delivery_person_id);

CREATE INDEX "ORDER_CONTENTS_DINEIN.orderid_recipeid"
	ON ORDER_CONTENTS_DINEIN
	USING btree
	(order_id,recipe_id);

CREATE INDEX "ORDER_CONTENTS_ONLINE.orderid_recipeid"
	ON ORDER_CONTENTS_ONLINE
	USING btree
	(order_id,recipe_id);

CREATE INDEX "ORDERS_DINEIN.orderid_customerid"
	ON ORDERS_DINEIN
	USING btree
	(order_id,customer_id);

CREATE INDEX "ORDERS_ONLINE.orderid_customerid"
	ON ORDERS_ONLINE
	USING btree
	(order_id,customer_id);

CREATE INDEX "GROCERY_ITEM_HISTORY.item_id"
	ON GROCERY_ITEM_HISTORY
	USING btree
	(item_id);





