const  pool = require('../models/database');

module.exports = class Menu{

    constructor( title, image, price, quantity){
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
    
    add_menu_item(){//need to add to menu_recipe and grocery
        return pool.query('update')
    }

    static get_menu(){
        return pool.query('select recipe_id, name, category, price from menu_recipe where status = ‘available’;');
    }
}