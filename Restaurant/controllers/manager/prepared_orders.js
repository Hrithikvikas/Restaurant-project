const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');
const Pending= require('../../models/pend_delivery');
const Deliv= require('../../models/delivery');

exports.get_prepared_orders = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            Kitch.get_prepared_orders().then((answer1) =>{
                var prep_orders=answer1.rows;
                res.render('./manager/prepared_orders', {
                    pageTitle: 'Prepared Orders',
                    path: '/manager/prepared_orders',
                    prepared_orders: prep_orders

                })
            })
        }
        else{
            res.redirect(cookies.accont_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
}