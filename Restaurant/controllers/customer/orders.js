const Prod = require('../models/customer');
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

exports.post_add_order =(req,res,next) => {
    const customer_id='fill here';
    //check if all items that are in cart are available otherewise error.
    Cust.get_cart(customer_id).then((answer1) =>{
        Menu.check_availabilty(answer1.rows).then((answer2) =>{
            if(answer2==0){
                //some item is not available need to implement this with some error.
                res.redirect('/customer/cart');
            }
            else{//all items in cart are available.
                Cust.add_order(customer_id,answer1.rows,delivery_addr,phone_number).then(() =>{
                    Cust.empty_cart(customer_id).then(() => {
                        res.redirect('/customer/orders');
                    })
                })

            }
        }
    )})
}
exports.post_test_orders = (req,res,next) => {
    Prod.get_cum_cart_credits().then((answer1) => {
        Prod.get_credit_and_cart().then((answer2) => {
            if(answer1.rowCount==0){
                res.redirect('/cart');
            }
            else if(answer1.rows[0].sum<=answer2.rows[0].credit){
                //need to empty cart and decrease credit
                //first add to orders from cart;
                Prod.get_credit_and_cart().then((answer3) =>{
                    Prod.add_order(answer3.rows).then((answer4) => {
                        Prod.dec_credit(answer1.rows[0].sum).then(()  => {
                            Prod.empty_cart().then(() => {
                            res.redirect('/orders');
                        })
                    })
                })
            })
            }
            else{
                res.redirect('/cart');
            }
            // console.log(answer1.rows[0].sum);
            // console.log(answer2.rows[0].credit);
            // res.redirect('/orders');
        })
    })
}