const Cust=require('../models/customer');

export.get_items_cart = (req,res,next) => {
    Cust.get_cart
exports.get_test_cart =(req,res,next) => {
    Cust.get_cart().then((answer1) => {
        // we need to calculate 
    })
    // t1=Prod.get_all();
    Prod.get_credit().then((answer1) =>{
        Prod.get_credit_and_cart().then((answer2) => {
            res.render('./cart', {
                pageTitle: 'Cart',
                path: '/cart',
                credits: answer1.rows[0].credit,
                cart_items: answer2.rows

            }); 
        })
    })
    // Prod.get_credit_and_cart().then( (answer1) => {
    //     // console.log(answer1.rows);
    //     res.render('./cart', {
    //         pageTitle: 'Cart',
    //         path: '/cart',
    //         credits: answer1.rows[0].credit,
    //         cart_items: answer1.rows
    //         // editing: false
    //     });
    // })
    // console.log(t1);

};

export.post_delete_item_from_cart = (req,res,next) => {
    Cust.get_credit_and_cart
}
