const Prod = require('../../models/customer');
exports.get_orders =(req,res,next) => {

    // t1=Prod.get_all();
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
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
                
            });
        }
        else{}
    }
    else{}
    // console.log(t1);
    
};

exports.post_add_order =(req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            //check if all items that are in cart are available otherewise error.
            Cust.get_all_cart(cust_id).then((answer1) =>{
            Cust.check_availabilty(cust_id).then((answer2) =>{
                var t1=answer1.rows.recipe_id;
                var t2=answer2.rows.recipe_id;
                var count=0;
                t1.forEach(function (row1){
                    if(t2.includes(row1)){
                        count=count+1;
                    }
                });
                if(count!=answer1.rowCount){
                    console.log('all items not available');
                    //some item is not available need to implement this with some error.
                    res.redirect('/customer/cart');
                }
                else{//all items in cart are available.
                    Cust.add_order(customer_id,answer1.rows,delivery_addr,phone_number).then(() =>{
                        Cust.empty_cart(customer_id).then(() => {
                            res.redirect('/customer/orders');
                        });
                    })
                }
            })
            })
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }    
};

