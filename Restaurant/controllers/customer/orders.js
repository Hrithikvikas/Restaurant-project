const Cust = require('../../models/customer');
exports.get_orders =(req,res,next) => {

    // t1=Cust.get_all();
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            Cust.get_delivered_orders(cust_id).then( (delivered) => {
                Cust.get_pending_orders(cust_id).then( (pending) =>{

                    res.render('./customer/orders', {
                        pageTitle: 'Orders',
                        path: '/customer/orders',
                        cust_id: cust_id,
                        cust_name: cookies.username,
                        delivered_orders: delivered.rows,
                        pending_orders: pending.rows
                    });
        
                })
                // console.log(answer1);
                
            });
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
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
            Cust.get_cart(cust_id).then((answer1) =>{
            Cust.get_avl_cart(cust_id).then((answer2) =>{
                var t1=answer1.rows;
                var t2=answer2.rows;
                var t3=[];
                var t4=[];
                t1.forEach(function(ele){
                    t3.push(ele.recipe_id);
                });
                t2.forEach(function(ele){
                    t4.push(ele.recipe_id);
                });
                console.log('t3:'+t3);
                console.log('t4:'+t4)
                var count=0;
                t3.forEach(function (row1){
                    if(t4.includes(row1)){
                        count=count+1;
                    }
                });
                if(count!=answer1.rowCount){
                    console.log('all items not available');
                    //some item is not available need to implement this with some error.
                    res.redirect('/customer/cart');
                }
                else{//all items in cart are available.
                    
                        Cust.add_order(req.body.order_desc,cust_id,req.body.address,req.body.number).then((answer4) =>{
                            Cust.get_max_order().then((answer3) =>{
                                console.log('type:');
                                console.log(answer3.rows[0].order_id);
                                console.log(answer1.rows);
                                Cust.add_contents(answer3.rows[0].order_id,answer1.rows).then((answer5) =>{
                                    console.log('piggy');
                                    Cust.empty_cart(cust_id).then(() => {
                                        res.redirect('/customer/orders');
                                    });
                                })
                        
                            })
                        })
                        // Cust.add_order(answer3.rows[0].order_id+1,req.body.order_desc,cust_id,req.body.address,answer1.rows,req.body.number).then(() =>{
                        //     Cust.empty_cart(cust_id).then(() => {
                        //         res.redirect('/customer/orders');
                        //     });
                        // }

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

