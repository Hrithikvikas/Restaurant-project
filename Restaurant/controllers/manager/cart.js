//manager cart page
const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');
const Addr=require('../../models/addr');

exports.get_test = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page');
        //const manage_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            
            if('table_id' in cookies){
        	
                const table_id=cookies.table_id;
                console.log('table_id'+table_id);
                console.log('slot_no:'+cookies.slot_no);
                Manage.get_cart(table_id).then((answer1) =>{ //table_id should be fetched
                    var totalprice=0;
                    var p1=answer1.rows;
                    p1.forEach(function(c_row){
                       totalprice=totalprice+c_row.quantity*c_row.price;
                    });
                    res.render('./manager/cart',{
                        pageTitle: 'Cart',
                        path: '/manager/cart',
                        cart_items: answer1.rows,
                        totalprice: totalprice
                        
                    })
                })
            }
            else{
                // no table chosen
                console.log('No table chosen');
                res.redirect('/manager/home');
            }
            
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
        //const manager_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            if('table_id' in cookies){
                
                // const table_id=60;
                const table_id=req.body.table_id;
                const recipe_id=req.body.recipe_id;

                // console.log('table_id'+table_id);
                console.log('slot_no:'+cookies.slot_no);
            //this has to happen when remove button is clicked for any particular recipie in cart page
            Manage.delete_from_cart(table_id,recipe_id).then((answer1) =>{//table_id should be fetched
                res.clearCookie('table_id');
                res.redirect('/manager/cart');
            });
            }
            else{
            //     // no table chosen
                console.log('No table chosen');
                res.redirect('/manager/home');
            }

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


exports.post_make_order = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct post for making order');
        // const customer_id=cookies.customer_id;
        if(cookies.account_type=='manager'){
            if('table_id' in cookies){
            const table_id=cookies.table_id;
            var slotno;
            if('slot_no' in cookies){
                slotno= cookies.slot_no;}
            else{
                console.log('shouldnot come here');
                slotno=2;
            }
            const cust_id=cookies.customer_id;
            // const cust_id=100001;
            // const table_id=60;
            // const slotno=1;
            Manage.get_cart(table_id).then((answer1) =>{
                Manage.get_avl_cart(table_id).then((answer2) =>{
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
                        res.redirect('/manager/cart');
                    }
                    else{//all items in cart are available.
                        // table_id,slot_no,order_desc,cust_id,number
                            Manage.add_order(table_id,slotno,req.body.order_desc,cust_id,req.body.number).then((answer4) =>{
                                console.log('added into orders_dinein');
                                Manage.get_max_order().then((answer3) =>{
                                    console.log('type:');
                                    console.log(answer3.rows[0].order_id);
                                    console.log(answer1.rows);
                                    Manage.add_contents(answer3.rows[0].order_id,answer1.rows).then((answer5) =>{
                                        console.log('piggy');
                                        Manage.empty_cart(table_id).then(() => {
                                            console.log('successful order');
                                            res.redirect('/manager/home');
                                        });
                                    })
                            
                                })
                            })
                    }
    
                })
            })
            }
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }

}