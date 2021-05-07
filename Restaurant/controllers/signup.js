const addr= require('../models/addr')

exports.get_signup =  (req,res,next) => {
    //display available addresses.
   
    addr.get_addresses().then((addrs) =>{
        res.render('/signup',{
            path:'/signup',
            addr: addrs
        })
    });
}


exports.post_signup =  (req,res,next) => {
    const account=req.body.account_type;
    const name=req.body.name;
    const email=req.body.email_id;
    const passwd=req.body.password;
    
    if(req.body.account_type=="customer"){
        const addr=req.body.address;
        Cust.get_users().then((answer1) =>{
            var users=answer1.rows.email;
            const user=users.find(user => user);
            if(user){
                res.redirect('/signup');//include error message
            }
            else{
                Cust.add_new_user(name,account,email,passwd,addr).then((answer2) =>{
                    res.redirect('/signup');//no error message
                })   
            }
        })
    }
    else if(req.body.account_type=="delivery"){
        //get delivery tableand check if that person is present if there present error.We need to 
        //check two delivery person tables here.We need to approve the account by manager.
        const prim_addr=req.body.prim_address;
        const secd_addr=req.body.sec_address;
        Delivery.add_delivery_person()
    }
    
    
}
