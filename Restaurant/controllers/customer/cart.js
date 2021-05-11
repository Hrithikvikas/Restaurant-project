const Cust=require('../../models/customer');
const Addr=require('../../models/addr');
exports.get_cart = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            // res.clearCookie('username');
            Cust.get_cart(cust_id).then((answer1) =>{
                Addr.get_addresses().then((answer2) =>{
                    var totalprice=0;
                    var p1=answer1.rows;
                    p1.forEach(function(c_row){
                       totalprice=totalprice+c_row.quantity*c_row.price;
                    });
                // var 
                    console.log(p1);
                    res.render('./customer/cart',{
                    pageTitle: 'Cart',
                    path: '/customer/cart',
                    cart_items: answer1.rows,
                    totalprice: totalprice,
                    addrs: answer2.rows
                    })
                })
            })
        }
        else{//error
        res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        //error
        res.redirect('/login');
    }
};

exports.post_delete_item = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct post for delete');
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            const recipe_id=req.body.recipe_id;
            Cust.delete_from_cart(cust_id,recipe_id).then((answer1) =>{
                res.redirect('/customer/cart');
            });
        }
        else{//error
            res.redirect(cookies.account_type+'/home');
            }
        }
        else{
            //error
            res.redirect('/login');
        }
};
