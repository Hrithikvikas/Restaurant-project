const pool= require('../utils/database');
module.exports= class manager{
	static get_all_cart(table_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query('select t1.table_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe as p inner join ( SELECT * from TABLE_CART where table_id=$1) as t1 on t1.recipe_id = p.recipe_id order by p.category;',[table_id]);
    }

    static add_to_cart(table_id,recipe_id,quantity){
        const t1=[table_id,recipe_id,quantity];
        // var t2=pool.query('insert into cart(user_id,item_id,quantity) values(1,$1,1) on conflict (user_id,item_id) do update set quantity=cart.quantity+1;',t1);
        return pool.query('insert into table_cart(table_id,recipe_id,quantity) values($1,$2,$3) on conflict (table_id,recipe_id) do update set quantity=table_cart.quantity+$3;',t1);
        
    }
    static delete_from_cart(table_id,recipe_id){
        return pool.query('delete from TABLE_CART where table_id=$1 and recipe_id=$2;',[table_id,recipe_id]);
    }

    static check_availability(table_id){
		return pool.query('select recipe_id from menu_recipe inner join TABLE_CART on table_id=$1 and status="$2',[table_id,'available']);    
    }
    static get_avl_cart(table_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query("select t1.table_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe  as p inner join ( SELECT * from table_cart where table_id=$1) as t1 on t1.recipe_id = p.recipe_id and p.status='available' order by p.category,t1.recipe_id;",[table_id]);
    }

    static get_cart(table_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query('select t1.table_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe  as p inner join ( SELECT * from table_cart  where table_id=$1) as t1 on t1.recipe_id = p.recipe_id order by p.category,t1.recipe_id;',[table_id]);
    }

    static add_order(table_id,slot_no,order_desc,cust_id,number){
        //how to get the order_id?
        console.log('adding order now');
        return pool.query("insert into orders_dinein(customer_id, table_id , slot_no , time_date , order_desc , status ) values($3,$1,$4,date(current_timestamp),$2,'preparing');",[table_id,order_desc,cust_id,slot_no]);
    }

    static add_contents(prev_id,cart_rows){
        console.log('inside add order');
        console.log(cart_rows);
        cart_rows.forEach(function(c_row) {
            console.log(c_row.recipe_id);
            pool.query('insert into order_contents_dinein(order_id,recipe_id,quantity) values($1,$2,$3) ;',[prev_id,c_row.recipe_id,c_row.quantity]);
        });
        return pool.query('select * from orders_dinein'); 
        // pool.query('select * from orders_online where customer_id=$1 and ;');
    }

    static get_max_order(){
        return pool.query('select order_id from orders_dinein order by order_id desc limit 1');
    }
    static empty_cart(table_id){
    	return pool.query('delete from TABLE_CART where table_id=$1;',[table_id]);
    }

    //display number of orders to each destination in last one week
    //returns number_of_orders, order_destination
    static analysis_1(){
        return pool.query("select count(*) as number_of_orders, order_dest from ORDERS_ONLINE where DATE(delivery_out_time) BETWEEN DATE(current_date + INTERVAL '-7 day') and current_date group by order_dest;");
    }

    //total number of orders(both dinein and online included) in the past 1 week
    //returns total_orders
    static analysis_2(){
        return pool.query("select c1+c2 as total_orders from (select count(*) as c1 from ORDERS_DINEIN where time_date BETWEEN DATE(current_date + INTERVAL '-7 day') and current_date) as a1, (select count(*) as c2 from ORDERS_ONLINE where DATE(delivery_out_time) BETWEEN DATE(current_date + INTERVAL '-7 day') and current_date) as a2;");
    }

    //recipe and it's corresponding quantity(how much was it ordered(online orders))
    //returns name, Quantity, mydate
    static analysis_3(){
        return pool.query("select menu_recipe.name as name, sum(quantity) as Quantity, DATE(delivery_out_time) as mydate from (ORDERS_ONLINE NATURAL JOIN ORDER_CONTENTS_ONLINE) as a1 INNER JOIN menu_recipe ON menu_recipe.recipe_id = a1.recipe_id group by mydate, menu_recipe.name ORDER BY Quantity DESC, menu_recipe.name;");
    }

    //recipe and it's corresponding quantity(how much was it ordered(dine orders))
    //returns name, Quantity, mydate
    static analysis_4(){
        return pool.query("select menu_recipe.name as name, sum(quantity) as Quantity, time_date as mydate from (ORDERS_DINEIN NATURAL JOIN ORDER_CONTENTS_DINEIN) as a1 INNER JOIN menu_recipe on menu_recipe.recipe_id = a1.recipe_id group by mydate, menu_recipe.name ORDER BY Quantity DESC, menu_recipe.name;");
    }

}