const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');


// similar to menu page 

exports.get_test = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page');
        console.log(cookies.customer_id);
        const cust_id=cookies.customer_id;
        if(cookies.account_type=='manager'){
            if('table_id' in cookies){
            Menu.get_menu().then((answer1) => {
                var p1=answer1.rows;
                var cat_1=[];
                var cat_2=[];
                var cat_3=[];
                // console.log(p1[0]);
                console.log('table_id'+cookies.table_id);
                console.log('slot_no:'+cookies.slot_no);
                p1.forEach(function(c_row){
                    if(c_row.category == "starters"){
                        cat_1.push(c_row);
                    }
                    else if(c_row.category == "main_course"){
                        cat_2.push(c_row);
                    }
                    else{
                        cat_3.push(c_row);
                    }
                });
                // res.cookie('userid',)
                console.log('worked until here');
                res.render('./manager/menu', {
                    pageTitle: 'Menu',
                    path: '/manager/menu',
                    cat1_name: cat_1[0].category,
                    cat2_name: cat_2[0].category,
                    cat3_name: cat_3[0].category,
                    cat1: cat_1,
                    cat2: cat_2,
                    cat3: cat_3,
                    customer_id: cust_id, //how do I get the customer details? from req 
                    // menu_details: answer1.rows //here we get details of all available items in mneu
                });
            })
            }
            else{
                // no table chosen
                console.log('No table chosen');
                res.redirect('/manager/home');
            }
        }
        else{
            //send message saying that you are not a customer.
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
};

//we have addtocart button
exports.post_add_cart = (req,res,next) => {
    //do we need recipe id?
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.customer_id;
        if(cookies.account_type=='manager'){
            if('table_id' in cookies){
            const table_id=cookies.table_id;
            const recipe_id=req.body.recipeid;
            const quantity=req.body.quantity;
            console.log('table_id'+table_id);
            console.log('slot_no:'+cookies.slot_no);
            Manage.add_to_cart(table_id,recipe_id,quantity).then((answer1) =>{
            res.redirect('/manager/menu');
            });
            }
            
            else{
                // no table chosen
                console.log('No table chosen');
                res.redirect('/manager/home');
            }
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
    
};
