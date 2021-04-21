const Prod = require('../models/customer');
exports.get_test_orders =(req,res,next) => {

    // t1=Prod.get_all();
    Prod.get_orders(customer_id).then( (answer1) => {
        // console.log(answer1);
        res.render('./customer/orders', {
            pageTitle: 'Orders',
            path: '/customer/orders',
            all_orders: answer1.rows
            // credits: answer1.rows[0].credit,
            // cart_items: answer1.rows
            // // editing: false
        });
    })
    // console.log(t1);
    


};

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