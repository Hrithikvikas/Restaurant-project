const pool= require('../utils/database');
module.exports= class delivery{
	constructor( title, image, price, quantity){
		this.title = title;
		this.image = image;
		this.price = price;
		this.quantity = quantity;
	}
	// get_total_orders returns name, phone, costumer_id, order_id, order_desc, order_dest
	//should display name, phone, order_desc, order_dest in webpage
	static create_user(ans1){
		return pool.query('insert into delivery_person(name,phone,password,email,primary_address,secondary_address) values($1,$2,$3,$4,$5,$6);',[ans1.name,ans1.phone,ans1.password,ans1.email,ans1.primary_address,ans1.secondary_address]);
	}
	static get_user(email_id){
		return pool.query('select * from delivery_person where email=$1;',[email_id]);
	}
	static get_total_orders(deliv_id){
		return pool.query("SELECT CUSTOMER.name, phone, A.customer_id, order_id, order_desc, A.name as order_dest FROM (SELECT order_id, customer_id, order_desc, addresses.name FROM ORDERS_ONLINE INNER JOIN addresses ON addresses.addr_id = ORDERS_ONLINE.order_dest WHERE delivery_person_id = $1 AND status = 'out') as A INNER JOIN CUSTOMER on A.customer_id = CUSTOMER.customer_id;",[deliv_id]);
	}

	//used in controller only
	static get_orders_count(deliv_id){
		return pool.query("SELECT * FROM ORDERS_ONLINE WHERE delivery_person_id = $1 AND status = 'out';",[deliv_id]);
	}

	//post method helper function
	static set_order(order_id){

		return pool.query("UPDATE ORDERS_ONLINE SET status = 'delivered' WHERE order_id = $1;",[order_id]);
	}

	//post method helper function
	static set_delivery(deliv_id){
		return pool.query("UPDATE DELIVERY_PERSON SET availability = 'free' WHERE delivery_person_id = $1;",[deliv_id]);
	}

	static set_delivery_busy(deliv_id){
		return pool.query("UPDATE DELIVERY_PERSON SET availability = 'out' WHERE delivery_person_id = $1;",[deliv_id]);
	}

	static get_profile(deliv_id){
        return pool.query('select * from DELIVERY_PERSON where delivery_person_id=$1;',[deliv_id]);
    }

    static update_profile(name,phone,password,primary_address,secondary_address,id){
        return pool.query('update DELIVERY_PERSON set name=$1,phone=$2,password=$3,primary_address=$4,secondary_address=$5 where delivery_person_id=$6',[name,phone,password,primary_address,secondary_address,id]);
    }
    static get_primary_address(deliv_id){
    	return pool.query("select primary_address from DELIVERY_PERSON where delivery_person_id = $1", [deliv_id]);
    }
        static get_secondary_address(deliv_id){
    	return pool.query("select secondary_address from DELIVERY_PERSON where delivery_person_id = $1", [deliv_id]);
    }
}