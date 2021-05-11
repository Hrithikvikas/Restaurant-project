const addr= require('../models/addr')
const Deliv= require('../models/delivery');
const Cust= require('../models/customer');
const Pending= require('../models/pend_delivery');
exports.get_signup =  (req,res,next) => {
    //display available addresses.
    const { cookies } =req;
    
    if('user_id' in cookies){
        res.redirect(cookies.account_type+'/home');
    }
    else{
        addr.get_addresses().then((addrs) =>{
            res.render('./signup',{
                path:'/signup',
                addrs: addrs.rows
            })
        });
    }
}

exports.post_signup =  (req,res,next) => {
    // const account=req.body.account_type;
    const name=req.body.name;
    const email=req.body.email_id;
    const number=req.body.number;
    const passwd=req.body.passwd;
    
    if(req.body.account_type=="customer"){
        const addr=req.body.address;
        Cust.get_user(req.body.email_id).then((answer1) =>{
            if(answer1.rowCount==0){
                //create user.
                const address=req.body.address;
                
                Cust.create_customer(name,email,passwd,number,address).then((answer1) => {
                    //user created.
                    res.redirect('/login');
                })
            }
            else{
                //user already exists.                
                res.redirect('/login');
            }
            // var users=answer1.rows.email;
            // const user=users.find(user => user);
            // if(user){
            //     res.redirect('/signup');//include error message
            // }
            // else{
            //     Cust.add_new_user(name,account,email,passwd,addr).then((answer2) =>{
            //         res.redirect('/signup');//no error message
            //     })   
            // }
        })
    }
    else if(req.body.account_type=="delivery"){
        //get delivery tableand check if that person is present if there present error.We need to 
        //check two delivery person tables here.We need to approve the account by manager.
        const prim_address=req.body.prim_address;
        const sec_address=req.body.sec_address;
        Deliv.get_user(email).then((answer1)=> {
            if(answer1.rowCount==0){
                //check in pending delivery person table
                Pending.get_user(email).then((answer2) => {
                    if(answer2.rowCount==0){
                        //sign up into Pending.
                        Pending.create_user(name,number,passwd,email,prim_address,sec_address).then((answer3) => {
                            console.log('Your account has been sent forapproval');
                            res.redirect('/login');
                        });
                    }
                    else{
                        console.log('Your account has not been approved by the manager');
                        res.redirect('/login');
                    }
                })
            }
            else{
                console.log('Account with this email exists and approved by the manager');
                res.redirect('/login');
            }
        });
         
    }
    
    
}
