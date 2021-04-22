const pool= require('../utils/database');
module.exports= class Customer{
    constructor( title, image, price, quantity){
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }



    static create_new_customer(){

    }
    static get_profile(customer_id){
        return pool.query('select * from customer where customer_id=$1;',customer_id);
    }
    
    static update_profile(name,phone,password,address){
        return pool.query('');
    }

    static get_menu(){
        return pool.query('select recipe_id, name, category, price from menu_recipe where status = ‘available’;');
    }
    
    static add_to_cart(customer_id,recipe_id,quantity){
        const t1=[customer_id,recipe_id,quantity];
        // var t2=pool.query('insert into cart(user_id,item_id,quantity) values(1,$1,1) on conflict (user_id,item_id) do update set quantity=cart.quantity+1;',t1);
        return pool.query('insert into cart(customer_id,recipe_id,quantity) values($1,$2,$3) on conflict (customer_id,recipe_id) do update set quantity=cart.quantity+$3;',t1);
        
    }
    static get_cart(customer_id){
        // return pool.query('select recipe_id,quantity,price from cart,menu_recipe where customer_id=$1;',customer_id);
        return pool.query('select t1.customer_id,p.category,p.recipe_id,p.price,t1.quantity from products  as p inner join ( SELECT * from cart where customer_id=$1) as t1 on t1.recipe_id = p.recipe_id and p.status="available" order by p.category;',customer_id)
    }

    static add_order(customer_id,cart_rows){
        //how to get the order_id?
        
        pool.query('insert into orders_online(order_id,customer_id,order_desc,status,delivery_out_time) values($1,$2,"","preparing",$3);',[order_id,customer_id,time]);
        cart_rows.forEach(function(c_row) {
            pool.query('insert into orders_contents_online(order_id,recipe_id,quantity) values($1,$2,$3) ;',[c_row.order_id,c_row.recipe_id,c_row.quantity]);
        })
        return pool.query('select * from orders;');
    }
    //get orders whose status is delivered
    static get_all_orders(customer_id){
        return pool.query('select * from order_online where customer_id=$1;'.customer_id)
    }
    static empty_cart(customer_id){
        return pool.query('delete from cart where customer_id=$1;',customer_id);
    }
    
    

    
}