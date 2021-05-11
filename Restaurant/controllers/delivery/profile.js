const Deliv =require('../../models/delivery');
const Kitch =require('../../models/kitchen');
const Addr= require('../../models/addr');

exports.get_profile = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const deliv_id=cookies.user_id;
        if(cookies.account_type=='delivery'){
            Deliv.get_profile(deliv_id).then((answer1) =>{
                Addr.get_addresses().then((answer2) =>{
                    if(answer1.rows[0].address){
                        console.log('IT WORKS!');
                    }
                    console.log(answer1.rows);
                    res.render('delivery/profile', {
                        pageTitle: 'Profile',
                        path: '/delivery/profile',
                        addrs: answer2.rows,
                        deliv: answer1.rows[0]
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
    const name=req.body.deliv_name;
    //const email_id=req.body.email_id;
    const primary_address=req.body.primary_address;
    const secondary_address=req.body.secondary_address;
    //const address=req.body.address;
    
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const deliv_id=cookies.user_id;
        if(cookies.account_type=='delivery'){
            Deliv.update_profile(name,phone,password,primary_address,secondary_address,deliv_id).then((answer1) => {
                res.redirect('/delivery/profile');
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