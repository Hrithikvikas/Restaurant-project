const Cust =require('../../models/customer');
const Addr= require('../../models/addr');

exports.get_profile = (req,res,next) => {

    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            Cust.get_profile(cust_id).then((answer1) =>{
                Addr.get_addresses().then((answer2) =>{
                    if(answer1.rows[0].address){
                        console.log('IT WORKS!');
                    }
                    console.log(answer1.rows);
                    res.render('customer/profile', {
                        pageTitle: 'Profile',
                        path: '/customer/profile',
                        addrs: answer2.rows,
                        cust: answer1.rows[0]
                    });
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

exports.post_edit_profile = (req,res,next) => {
    const password=req.body.passwd;
    const phone=req.body.number;
    const name=req.body.cust_name;
    const address=req.body.address;
    
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            Cust.update_profile(name,phone,password,address,cust_id).then((answer1) => {
                res.redirect('/customer/profile');
            });
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
};

