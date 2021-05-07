const pool= require('../utils/database');
module.exports= class Customer{
    static create_new_customer(){

    }

    static delete_from_cart(customer_id,recipe_id){
        return pool.query('delete from cart where customer_id=$1 and recipe_id=$2;',[customer_id,recipe_id]);
    }
    static get_user(email_id){
        return pool.query('select * from customer where email=$1',[email_id]);
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

    static get_all_cart(customer_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query('select t1.customer_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe  as p inner join ( SELECT * from cart where customer_id=$1) as t1 on t1.recipe_id = p.recipe_id order by p.category;',[customer_id]);
    }

    static get_cart(customer_id){
        // 'select recipe_id'
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query('select t1.customer_id,p.name,p.category,p.recipe_id,p.price,t1.quantity from menu_recipe  as p inner join ( SELECT * from cart where customer_id=$1) as t1 on t1.recipe_id = p.recipe_id and p.status=$2 order by p.category;',[customer_id,'available']);
    }

    static add_order(customer_id,address,cart_rows){
        //how to get the order_id?
        
        pool.query('insert into orders_online(customer_id,order_desc,status,order_dest,delivery_out_time) values($1,$2,"preparing",$3);',[customer_id,address,time]);
        cart_rows.forEach(function(c_row) {
            pool.query('insert into orders_contents_online(order_id,recipe_id,quantity) values($1,$2,$3) ;',[c_row.order_id,c_row.recipe_id,c_row.quantity]);
        });
        return pool.query('select * from orders_online where customer_id=$1 and ;');
    }
    
    //get orders whose status is delivered
    static get_all_orders(customer_id){
        return pool.query('select * from order_online where customer_id=$1;'.customer_id)
    }
    static empty_cart(customer_id){
        return pool.query('delete from cart where customer_id=$1;',customer_id);
    }
    
    

    
}