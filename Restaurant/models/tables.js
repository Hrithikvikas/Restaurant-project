const pool= require('../utils/database');
module.exports = class Table{

    constructor( title, image, price, quantity){
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    // static update_tables_status(time){
    //     pool.query()
    // }

    static check_table(slotno,table_id){
        // var slot='slot'+slotno+'_status';
        if(slotno === 1){
            return pool.query('select table_id from tables where table_id=$1 and slot1_status="not_booked',[table_id]);
        }
        else if(slotno === 2){
            return pool.query('select table_id from tables where table_id=$1 and slot2_status="not_booked',[table_id]);
        }
        else {
            return pool.query('select table_id from tables where table_id=$1 and slot3_status="not_booked',[table_id]);
        }
        
    }
    static get_all_avl_tables(slotno){//for booking
        if(slotno === 1){
            return pool.query('select table_id,seater from tables where slot1_status="not_booked"');
        }
        else if(slotno===2){
            return pool.query('select table_id,seater from tables where slot2_status="not_booked"');
        }
        else{
            return pool.query('select table_id,seater from tables where slot3_status="not_booked"');
        }
    }

    static update_table(slotno,table_id){
        if(slotno === 1){
            return pool.query('update tables set slot1_status="booked" where table_id=$1',[table_id]);
        }
        else if(slotno===2){
            return pool.query('update tables set slot2_status="booked" where table_id=$1',[table_id]);
        }
        else{
            return pool.query('update tables set slot3_status="booked" where table_id=$1',[table_id]);
        }
    }

    static get_customer_tables(customer_id){
        return pool.query('select * from table_bookings where customer_id=$1',customer_id);
    }
    
}