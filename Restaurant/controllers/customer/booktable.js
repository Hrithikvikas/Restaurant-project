const Table = require('../models/tables');

exports.get_test_orders =(req,res,next) => {

    // t1=Prod.get_all();
    Prod.get_delivered_orders(customer_id).then( (answer1) => {
        Prod.get_other_orders(customer_id).then( (answer2) =>{
            res.render('./customer/orders', {
                pageTitle: 'Orders',
                path: '/customer/orders',
                delivered_orders: answer1.rows,
                other_orders: answer2.rows

                // credits: answer1.rows[0].credit,
                // cart_items: answer1.rows
            });

        })
        // console.log(answer1);
        
    })
    // console.log(t1);
    
};

exports.get_tables = (req,res,next) =>{
    Table.get_tables(slotno).then((answer1) => {
        res.render('./customer/booktable', {
            // customer_id,
            path: '/customer/booktable',
            avlbl_tables: answer1.rows,

        });
    })
}