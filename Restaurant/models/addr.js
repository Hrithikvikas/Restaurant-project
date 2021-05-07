const pool= require('../utils/database');
module.exports= class Address{
    static get_addresses(){
        return pool.query('select * from addresses;');
    }

    static add_new_address(){}
}