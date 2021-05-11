const  pool = require('../utils/database');

module.exports = class Menu{

    constructor( title, image, price, quantity){
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
    
    add_menu_item(){//need to add to menu_recipe and grocery
        // return pool.query('update')
        return 0;
    }

    static get_menu(){
        return pool.query("select recipe_id,name,category,price from menu_recipe where status = $1;",['available']);
    }
    static get_all_items(){
        return pool.query('select * from menu_recipe order by recipe_id asc,category;'); 
    }
    static update_item(recipe_id,price,status){
        console.log('updating item');
        return pool.query('update menu_recipe set price=$2,status=$3 where recipe_id=$1;',[recipe_id,price,status]);
    }
}