const Cust=require('../models/customer');

exports.get_cart = (req,res,next) => {
    Cust.get_cart(customer_id).then((answer1) =>{
        var total_price=0;
        // var 
        res.render('./customer/cart',{
            pageTitle: 'Cart',
            path: '/customer/cart',
            cart_items: answer1.rows
        })
    })
}
// exports.get_test_cart =(req,res,next) => {
//     Cust.get_cart().then((answer1) => {
//         // we need to calculate 
//     })
//     // t1=Prod.get_all();
//     Prod.get_credit().then((answer1) =>{
//         Prod.get_credit_and_cart().then((answer2) => {
//             res.render('./cart', {
//                 pageTitle: 'Cart',
//                 path: '/cart',
//                 credits: answer1.rows[0].credit,
//                 cart_items: answer2.rows

//             }); 
//         })
//     })

// };

exports.post_delete_item_from_cart = (req,res,next) => {
    const recipe_id=req.body.id;
    Cust.delete_from_cart(customer_id,recipe_id).then((answer1) =>{
        res.redirect('/customer/cart');
    })
}
