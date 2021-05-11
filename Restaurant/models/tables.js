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
        if(slotno == 1){
            return pool.query('select table_id from tables where table_id=$1 and slot1_status=$2;',[table_id,'not_booked']);
        }
        else if(slotno == 2){
            return pool.query('select table_id from tables where table_id=$1 and slot2_status=$2;',[table_id,'not_booked']);
        }
        else {
            return pool.query('select table_id from tables where table_id=$1 and slot3_status=$2;',[table_id,'not_booked']);
        }
        
    }
    static get_all_avl_tables(slotno){//for booking
        if(slotno == 1){
            return pool.query('select table_id,seater from tables where slot1_status=$1;',['not_booked']);
        }
        else if(slotno==2){
            return pool.query('select table_id,seater from tables where slot2_status=$1;',['not_booked']);
        }
        else{
            return pool.query('select table_id,seater from tables where slot3_status=$1;',['not_booked']);
        }
    }

    // static update_table(cust_id,slotno,table_id){
    //     pool.query('insert into table_bookings(customer_id,table_id,slot_no,time_date) values($1,$3,$2,CURRENT_TIMESTAMP);',[cust_id,slotno,table_id]);
    //     if(slotno == 1){
    //         return pool.query('update tables set slot1_status=$2 where table_id=$1',[table_id,'booked']);
    //     }
    //     else if(slotno==2){
    //         return pool.query('update tables set slot2_status=$2 where table_id=$1',[table_id,'booked']);
    //     }
    //     else{
    //         return pool.query('update tables set slot3_status=$2 where table_id=$1',[table_id,'booked']);
    //     }
    // }
    static add_booking(cust_id,slotno,table_id){
        return pool.query('insert into table_bookings(customer_id,table_id,slot_no,time_date) values($1,$3,$2,CURRENT_TIMESTAMP);',[cust_id,slotno,table_id]);
    }
    static update_table(cust_id,slotno,table_id){
        // pool.query('insert into table_bookings(customer_id,table_id,slot_no,time_date) values($1,$3,$2,CURRENT_TIMESTAMP);',[cust_id,slotno,table_id]);
        if(slotno == 1){
            return pool.query('update tables set slot1_status=$2 where table_id=$1',[table_id,'booked']);
        }
        else if(slotno==2){
            return pool.query('update tables set slot2_status=$2 where table_id=$1',[table_id,'booked']);
        }
        else{
            return pool.query('update tables set slot3_status=$2 where table_id=$1',[table_id,'booked']);
        }
    }


    static get_customer_tables(customer_id){
        return pool.query('select t1.table_id,t2.slot_no,t1.seater from tables as t1  inner join table_bookings as t2 on t1.table_id=t2.table_id and customer_id=$1 order by time_date desc',[customer_id]);
    }
    static get_cust_id(table_id,slotno){
        var today= new Date();
        // today
        return pool.query('select t1.table_id,t1.slot_no,t2.* from customer as t2 inner join  (select * from table_bookings where table_id=$1 and slot_no=$2 and time_date = DATE(CURRENT_TIMESTAMP)) as t1 on t1.customer_id=t2.customer_id;'[table_id,slotno]);
    }
    static get_all_tables(){
        return pool.query('select * from tables ; ')
    }
    static get_not_booked_tables(slotno){
        if(slotno == 1){
            return pool.query("select *,1 as slot_no from tables where slot1_status!='booked'; ");
        }
        else if(slotno==2){
            return pool.query("select *,2 as slot_no from tables where slot2_status!='booked';");
        }
        else{
            return pool.query("select *,3 as slot_no from tables where slot3_status!='booked';");
        }
    }
    static get_booked_tables(slotno){
        return pool.query("select t1.table_id,t1.slot_no,t3.seater,t2.* from customer as t2 inner join  (select * from table_bookings where slot_no=$1 and time_date = DATE(CURRENT_TIMESTAMP)) as t1 on t1.customer_id=t2.customer_id inner join tables as t3 on t1.table_id=t3.table_id ;",[slotno]);
        // if(slotno == 1){
        //     return pool.query("select * from tables where slot1_status!='booked'; ");
        // }
        // else if(slotno==2){
        //     return pool.query("select * from tables where slot2_status!='booked';");
        // }
        // else{
        //     return pool.query("select * from tables where slot3_status!='booked';");
        // }
    }
    static get_table_info(){
        // 'select t1.*,t3.*,t2.datetables as t1 inner join table_bookings as t2 on t1.table_id=t2.table_id and t2.time_date=$1 inner join customer as t3 on t3.customer_id=t2.customer_id ;',[current_time]
    
    'select table_id,customer_id,seater,slot'+String(slot_no)+'_status from tables t1  join table_bookings t2 where t1.table_id=t2.table_id  '}
}