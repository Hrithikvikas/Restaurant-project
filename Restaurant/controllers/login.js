const Cust =require('../models/customer');

exports.get_login =  (req,res,next) => {
    res.render('./login');
}


exports.post_login =  (req,res,next) => {
    console.log('came here');
    if(req.body.account_type=="customer"){
        Cust.get_user(req.body.email_id).then((answer1) =>{
            // var users=answer1.rows.email;
            // const user=users.find(user => user);
            if(answer1.rowCount==0){
                console.log('not correct      dummy');
                res.redirect('/login');//include error message
            }
            else{
                if(req.body.passwd==answer1.rows[0].password){
                    res.cookie('userid',answer1.rows[0].customer_id);
                    res.cookie('account_type','customer');
                    res.cookie('username',answer1.rows[0].name);
                    console.log('successful add');
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
                    console.log('not correct');
                    res.redirect('/login');//include error message
                }
            }
        })
    }
    else if(req.body.account_type=="delivery"){
        //get delivery tableand check same as customers.
    }
    else if(req.body.account_type=="manager"){
        //do sam as customer but only one id
    }
    else if(req.body.account_type=="kitchen"){

    }
    
    
}
