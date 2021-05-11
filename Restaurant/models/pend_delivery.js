const pool= require('../utils/database');
module.exports= class pend_delivery{
    static create_user(name,phone,password,email,primary_address,secondary_address){
		return pool.query('insert into pending_delivery_person(name,phone,password,email,primary_address,secondary_address) values($1,$2,$3,$4,$5,$6);',[name,phone,password,email,primary_address,secondary_address]);
	}
    static get_user(email_id){
        return pool.query('select * from pending_delivery_person where email=$1;',[email_id]);
    }
    static get_user_from_id(del_id){
        return pool.query('select * from pending_delivery_person where delivery_person_id=$1;',[del_id]);
    }
    static get_pending_users(){
        return pool.query("select * from pending_delivery_person where status='pending';");
    }

    static reject_user(del_id){
        return pool.query("update pending_delivery_person set status='rejected' where delivery_person_id=$1;",[del_id]);
    }
    static delete_user(del_id){
        return pool.query("delete from pending_delivery_person where delivery_person_id=$1;",[del_id]);
    }
}    