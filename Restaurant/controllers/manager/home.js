//manager home page controller
const Manage =require('../../models/manager');
const Menu =require('../../models/menu');
const Table =require('../../models/tables');
const Kitch =require('../../models/kitchen');

exports.get_test = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page');
        //const manage_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            Table.get_all_tables().then((answer1) => {
                

                var today = new Date();
                var ter1=today.toUTCString();
               
                console.log( ter1);
                var tem1=ter1.split(' ');
                // tem1=tem1[]
                var hr=tem1[4][0]+tem1[4][1];
                hr=parseInt(hr);
                // console.log(typeof hr);
                var slot=0;
                if(hr<14){//slot1: 11-14
                    slot=1;
                }
                else{
                    if(hr<18){//slot2 15-18
                        slot=2;
                    }
                    else{//slot3 20-23
                        slot=3;
                    }
                }
                console.log('slot:'+slot);
                Table.get_not_booked_tables(slot).then((answer3) =>{
                    //to get booked tables for tnhe slot
                    var t1=answer3.rows;
                    Table.get_booked_tables(slot).then((answer4) =>{
                        var t2=answer4.rows;
                    res.cookie('slot_no',slot);
                    // res.cookies('table_id')
                        // console.log('not booked');
                        // console.log(t1);
                        console.log('booked');
                        // console.log(t2);
                        res.render('./manager/home', {
                            pageTitle: 'Home ',
					        path: '/manager/home',
                            booked_tables: t2, 
                            not_booked_tables: t1
                        });
                        
                    });
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

exports.post_test = (req,res,next) => {
    const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page');
        //const manage_id=cookies.user_id;
        if(cookies.account_type=='manager'){
            res.cookie('table_id',req.body.table_id);
            res.cookie('customer_id',req.body.customer_id);
            res.redirect('/manager/menu');
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
    
};