const pool= require('../utils/database');
module.exports= class kitchen{
	constructor( title, image, price, quantity){
		this.title = title;
		this.image = image;
		this.price = price;
		this.quantity = quantity;
	}


	static get_user(email_id){
		return pool.query('select * from kitchen_staff where kitchen_staff_id=100 and email=$1;',[email_id]);
	}
	//order_id, table_id, order_desc, menu_item, quantity, time_date will be returned
	//table_id, order_desc, menu_item, quantity should be displayed on webpage
	static get_total_dinein(){
		var today = new Date();
		// Sun May 09 2021 11:24:44 GMT+0530
		console.log('today:'+today);
		var dd =  String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;
		return pool.query("select order_id, table_id, order_desc, string_agg(name,'~') as menu_items,string_agg(CAST(quantity as TEXT),'~') as quantity ,time_date FROM (ORDERS_DINEIN NATURAL JOIN ORDER_CONTENTS_DINEIN) INNER JOIN MENU_RECIPE ON MENU_RECIPE.recipe_id = ORDER_CONTENTS_DINEIN.recipe_id where ORDERS_DINEIN.status='preparing' GROUP BY order_id ORDER BY time_date;");
	}
	//order_id, table_id, order_dest, menu_item, quantity, time_date will be returned
	//order_dest, order_desc, menu_item, quantity should be displayed on webpage
	static get_total_online(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;
		//removing where for nopw need to put it back
		return pool.query("select order_id, order_dest, order_desc, string_agg(name,'~') as menu_items,string_agg(CAST(quantity as TEXT),'~') as quantity, delivery_out_time FROM (ORDERS_ONLINE NATURAL JOIN ORDER_CONTENTS_ONLINE) INNER JOIN MENU_RECIPE ON MENU_RECIPE.recipe_id = ORDER_CONTENTS_ONLINE.recipe_id where ORDERS_ONLINE.status='preparing' GROUP BY order_id ORDER BY delivery_out_time;");
	}
	

	//return item_id, name, quantity
	static get_groceries(){
		return pool.query('select * FROM GROCERY_ITEM ORDER BY name;');
	}
	static update_dinein(order_id){
		return pool.query("UPDATE ORDERS_DINEIN SET status = 'out' WHERE order_id = $1;",[order_id]);
	}
	static update_online(order_id){
		return pool.query("UPDATE ORDERS_ONLINE SET status = 'prepared' WHERE order_id = $1;",[order_id]);
	}
	static set_item_quantity(item_id,quant){
		return pool.query('UPDATE GROCERY_ITEM SET quantity = $2 WHERE item_id = $1;',[item_id,quant]);
	}
	static get_free_delivery_primary(order_dest){
		return pool.query("SELECT delivery_person_id, primary_address,secondary_address FROM DELIVERY_PERSON WHERE availability = 'free' AND primary_address = $1;", [order_dest]);
	}
	static get_free_delivery_secondary(order_dest){
		return pool.query("SELECT delivery_person_id, primary_address,secondary_address FROM DELIVERY_PERSON WHERE availability = 'free' AND secondary_address = $1;", [order_dest]);
	}
	static get_pend_delivery(addr_id){
		return pool.query("SELECT order_id FROM ORDERS_ONLINE WHERE status = 'prepared' AND order_dest = $1;",[addr_id]);
	}
	static order_allot(deliv_id,ord_id){
		return pool.query("UPDATE ORDERS_ONLINE SET status = 'out',delivery_person_id = $2 WHERE order_id = $1;",[ord_id,deliv_id]);
	}
	static set_delivery(deliv_id){
		return pool.query("UPDATE DELIVERY_PERSON SET availability = 'out'  WHERE delivery_person_id = $1",[deliv_id]);
	}

	static get_address(order_id){
		return pool.query("select order_dest from ORDERS_ONLINE where order_id = $1",[order_id]);
	}
	static get_prepared_orders(){
		return pool.query("select * from orders_dinein where status='out' and time_date=DATE(CURRENT_TIMESTAMP) order by order_id desc;");
	}
}