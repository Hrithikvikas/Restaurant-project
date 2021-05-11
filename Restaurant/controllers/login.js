const Cust =require('../models/customer');
const Deliv=require('../models/delivery');
const Kit=require('../models/kitchen');
const Pending=require('../models/pend_delivery');

exports.get_login =  (req,res,next) => {
    const { cookies } =req;
    // console.log(cookies);
    if('user_id' in cookies){
        res.redirect(cookies.account_type+'/home');
    }
    else{
        res.render('./login');
    }
}

exports.user_logout = (req,res,next) => {
    const { cookies } =req;
    // console.log(cookies);
    if('user_id' in cookies){
        // console.log('correct page')
        const user_id=cookies.user_id;
        // for(int i=0;i<cookies.length;i++){
        //     res.clearCookie
        // }
        res.clearCookie('user_id');
        res.clearCookie('username');
        res.clearCookie('slot_no');
        res.clearCookie('account_type');
        res.clearCookie('table_id');
        res.clearCookie('customer_id');
        res.render('./logout');
    }
    else{
        // res.send('No user is logged in ');
        res.redirect('/login');
    }
}
exports.post_login =  (req,res,next) => {
    // console.log('came here');
    console.log(req.body.account_type);
    if(req.body.account_type=="customer"){
        Cust.get_user(req.body.email_id).then((answer1) =>{
            // var users=answer1.rows.email;
            // const user=users.find(user => user);
            if(answer1.rowCount==0){
                
                console.log('No such customer ');
                res.redirect('/login');//include error message
            }
            else{
                if(req.body.passwd==answer1.rows[0].password){
                    res.cookie('user_id',answer1.rows[0].customer_id);
                    res.cookie('account_type','customer');
                    res.cookie('username',answer1.rows[0].name);
                    console.log('successful login');
                    res.redirect('customer/home');
                }
                // var passwords=answer1.rows.password;
                // var t1=answer1.rows.find(c => c.user==user);
                // const passwd=t1.password;
                // if(passwd==req.body.password){
                //     res.cookie('user_id',t1.customer_id);
                //     res.cookie('account_type','customer');
                //     res.cookie('username',t1.name);
                //     res.redirect('customer/home');
                // }
                else{
                    console.log('not correct password');

                    res.redirect('/login');//include error message
                }
            }
        })
    }
    else if(req.body.account_type=="delivery"){
        //get delivery tableand check same as customers.
        Deliv.get_user(req.body.email_id).then((answer1) =>{
            // var users=answer1.rows.email;
            // const user=users.find(user => user);
            if(answer1.rowCount==0){
                Pending.get_user(req.body.email_id).then((answer2) => {
                    if(answer2.rowCount==0){
                        console.log('Account has not been created');
                        res.redirect('/signup');
                        //sign up into Pending.                       
                    }
                    else{
                        if(req.body.passwd==answer2.rows[0].password){
                            console.log('Your account has not been approved by the manager');
                            res.redirect('/login');
                        }
                        else{
                            console.log('not correct password');
                            res.redirect('/login');//include error message
                        }
                        
                    }
                })
                
            }
            else{
                if(req.body.passwd==answer1.rows[0].password){
                    res.cookie('user_id',answer1.rows[0].delivery_person_id);
                    res.cookie('account_type','delivery');
                    res.cookie('username',answer1.rows[0].name);
                    console.log('successful login');
                    res.redirect('/delivery/home');
                }
                else{
                    console.log('not correct password');
                    res.redirect('/login');//include error message
                }
            }
        })
    }
    else if(req.body.account_type=="manager"){
        //do sam as customer but only one id=100000;
        Cust.get_user(req.body.email_id).then((answer1) => {
            if(answer1.rowCount!=0){
                if(answer1.rows[0].customer_id==100000){
                if(answer1.rows[0].password==req.body.passwd){
                    res.cookie('user_id',answer1.rows[0].customer_id);
                    res.cookie('account_type','manager');
                    res.cookie('username',answer1.rows[0].name);
                    console.log('successful login');
                    res.redirect('manager/home');
                }
                else{
                    console.log('not correct password');
                    // console.log(answer1.rows[0].password.length);
                    console.log(req.body.passwd);
                    res.redirect('/login');//include error message
                }}
                else{
                    res.redirect('/login');
                    console.log('Manager dont have these password');
                }
            }
            else{
                res.redirect('/login');
                console.log('Manager dont have these credentials');
            }
        });
    }
    else if(req.body.account_type=="kitchen"){
        Kit.get_user(req.body.email_id).then((answer1) => {
            if(answer1.rowCount!=0){
                
                if(answer1.rows[0].password==req.body.passwd){
                    res.cookie('user_id',answer1.rows[0].kitchen_staff_id);
                    res.cookie('account_type','kitchen');
                    res.cookie('username',answer1.rows[0].name);
                    console.log('successful login');
                    res.redirect('kitchen/home');
                }
                else{
                    console.log('not correct password');
                    res.redirect('/login');//include error message
                }
                
            }
            else{
                res.redirect('/login');
                console.log('Kitchen dont have these credentials');
            }
        });
    }
    
    
}
