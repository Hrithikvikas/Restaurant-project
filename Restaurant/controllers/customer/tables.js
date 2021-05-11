const Table=require('../../models/tables');

exports.get_cust_table =(req,res,next) =>{//we need to get the information of the slot
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            Table.get_customer_tables(cust_id).then((answer1) => {
                console.log(answer1.rows);
                res.render('customer/tables',{
                    pageTitle: 'Tables',
                    path: '/customer/tables',
                    tables_booked: answer1.rows,
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
    
};



//this is used when we choose a slot and redirected to booktable page.(i.e press book this table button on table booking page.)
exports.post_choose_slot= (req,res,next) =>{
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            const slotno=req.body.slot_no;
            const date=req.body.date;
        
            // Table.get_avl_tables().then((answer1) =>{
                res.cookie('slot_no',slotno);
                console.log('worked until slot chose');
                res.redirect('/customer/booktable'); //also store the slotno here.
            // })
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
        
    //here confirm whether 
};