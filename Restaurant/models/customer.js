const pool= require('../utils/database');
module.exports= class Customer{
    static create_customer(name,email,passwd,number,address){
        return pool.query('insert into customer(name,phone,password,email,address) values($1,$4,$3,$2,$5)',[name,email,passwd,number,address]);

    }

    static delete_from_cart(customer_id,recipe_id){
        return pool.query('delete from cart where customer_id=$1 and recipe_id=$2;',[customer_id,recipe_id]);
    }
    static get_user(email_id){
        return pool.query("select * from customer where email=$1",[email_id]);
    }
    static check_availability(customer_id){
        return pool.query('select recipe_id from menu_recipe inner join cart on customer_id=$1 and status="$2',[customer_id,'available']);
    }
    
    static get_profile(customer_id){
        return pool.query('select * from customer where customer_id=$1;',[customer_id]);
    }
    
    static update_profile(name,phone,password,address,id){
        return pool.query('update customer set name=$1,phone=$2,password=$3,address=$4 where customer_id=$5',[name,phone,password,address,id]);
    }

    static get_menu(){
        return pool.query('select recipe_id, name, category, price from menu_recipe where status = ‘available’;');
    }
    
    static add_to_cart(customer_id,recipe_id,quantity){
        const t1=[customer_id,recipe_id,quantity];
        // var t2=pool.query('insert into cart(user_id,item_id,quantity) values(1,$1,1) on conflict (user_id,item_id) do update set quantity=cart.quantity+1;',t1);
        return pool.query('insert into cart(customer_id,recipe_id,quantity) values($1,$2,$3) on conflict (customer_id,recipe_id) do update set quantity=cart.quantity+$3;',t1);
        
    }


    static get_avl_cart(customer_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query("select t1.customer_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe  as p inner join ( SELECT * from cart where customer_id=$1) as t1 on t1.recipe_id = p.recipe_id and p.status='available' order by p.category;",[customer_id]);
    }

    static get_cart(customer_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query('select t1.customer_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe  as p inner join ( SELECT * from cart where customer_id=$1) as t1 on t1.recipe_id = p.recipe_id;',[customer_id]);
    }

    static add_order(order_desc,customer_id,address,number){
        //how to get the order_id?
        return pool.query("insert into orders_online(customer_id,order_desc,status,order_dest,delivery_out_time) values($1,$2,'preparing',$3,CURRENT_TIMESTAMP);",[customer_id,order_desc,address]);
    }

    static add_contents(prev_id,cart_rows){
        console.log('inside add order');
        console.log(cart_rows);
        cart_rows.forEach(function(c_row) {
            console.log(c_row.recipe_id);
            pool.query('insert into order_contents_online(order_id,recipe_id,quantity) values($1,$2,$3) ;',[prev_id,c_row.recipe_id,c_row.quantity]);
        });
        return pool.query('select * from orders_online'); 
        // pool.query('select * from orders_online where customer_id=$1 and ;');
    }
    static get_max_order(){
        return pool.query('select order_id from orders_online order by order_id desc limit 1');
    }
    static get_delivered_orders(customer_id){
        return pool.query("select t1.order_id,order_desc,order_dest,string_agg(CAST(t2.recipe_id as TEXT) ,'~') as menu_ids,string_agg(CAST(t2.quantity as TEXT),'~') as quantity,string_agg(CAST(t3.name as TEXT),'~') as menu_names,delivery_person_id from orders_online as t1 inner join order_contents_online as t2 on t1.order_id=t2.order_id inner join menu_recipe as t3 on t2.recipe_id=t3.recipe_id where customer_id=$1 and t1.status='delivered' group by t1.order_id order by t1.order_id desc;",[customer_id]);
    }
    static get_pending_orders(customer_id){
        return pool.query("select t1.order_id,order_desc,order_dest,t1.status,string_agg(CAST(t2.recipe_id as TEXT) ,'~') as menu_ids,string_agg(CAST(t2.quantity as TEXT),'~') as quantity,string_agg(CAST(t3.name as TEXT),'~') as menu_names,delivery_person_id from orders_online as t1 inner join order_contents_online as t2 on t1.order_id=t2.order_id inner join menu_recipe as t3 on t2.recipe_id=t3.recipe_id where customer_id=$1 and t1.status!='delivered' group by t1.order_id order by t1.order_id desc;",[customer_id]);
    }
    // 'select from order_online as t3, (select from menu_recipe as t1 inner join (select * from order_contents_online where customer_id=$1) as t2 on t1.recipe_id=t2.recipe_id) as t4 where t3.order_id=t4.order_id'
    //get orders whose status is delivered
    static get_all_orders(customer_id){
        return pool.query('select * from order_online where customer_id=$1;',[customer_id]);
    }
    static empty_cart(customer_id){
        return pool.query('delete from cart where customer_id=$1;',[customer_id]);
    }
    
    

    
}