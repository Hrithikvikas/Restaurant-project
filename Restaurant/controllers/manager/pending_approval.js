//manager pending approvals page
const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');
const Pending= require('../../models/pend_delivery');
const Deliv= require('../../models/delivery');

exports.get_pending = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            Pending.get_pending_users().then((answer1) =>{
                res.render('./manager/pending_approval', {
                    pageTitle: 'Pending Approvals',
                    path: '/manager/pending_approval',
                    pending: answer1.rows
                });
                 
            })
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
}

exports.post_test = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        // const cust_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            const status=req.body.status;
            const del_id=req.body.delivery_id;
            if(status=='accept'){
                Pending.get_user_from_id(del_id).then((answer1) => {
                    Deliv.create_user(answer1.rows[0]).then((answer2) => {
                        res.redirect('/manager/pending_approval');
                    }).then(() =>{
                        Pending.delete_user(del_id);
                    });
                })
            }
            else{
                Pending.reject_user(del_id).then(() => {
                    res.redirect('/manager/pending_approval');
                });
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