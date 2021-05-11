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
                
                // var p1=answer1.rows;
                // var p2=[];
                // var p3;
                var today = new Date();
                // console.log(Date.prototype.toGMTS);
                var slot=0;
                if(today.getHours()<10){
                    slot=1;
                }
                else{
                    if(today.getHours()<14){
                        slot=2;
                    }
                    else{
                        slot=3;
                    }
                }
                console.log('slot:'+slot);
		// // Sun May 09 2021 11:24:44 GMT+0530
		// console.log('today:'+today);
		// var dd =  String(today.getDate()).padStart(2, '0');
		// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		// var yyyy = today.getFullYear();

		// today = yyyy + '-' + mm + '-' + dd;
                Table.get_not_booked_tables(slot).then((answer3) =>{
                    //to get booked tables for tnhe slot
                    var t1=answer3.rows;
                    Table.get_booked_tables(slot).then((answer4) =>{
                        var t2=answer4.rows;
                   
                    // // p3=answer3.rows;
                    // p1.forEach(function(c_row){
                    //     var today = new Date();
                    //     var slot=0;
                    //     if(today.getHours()<10){
                    //         slot=1;
                    //         if(c_row.slot1_status =='booked'){
                    //             Table.get_cust_id(c_row.table_id,slot).then((answer2) => {
                    //                 p2.push(answer2.rows[0]);
                    //             });
                    //         }
                    //         else{}
                    //     }
                    //     else {
                    //         if(today.getHours()<14){
                    //             slot=2;
                    //             if(c_row.slot2_status =='booked'){
                    //                 Table.get_cust_id(c_row.table_id,slot).then((answer2) => {
                    //                     p2.push(answer2.rows[0]);
                    //                 });
                    //             }
                    //         }
                    //         else{
                    //             slot=3;
                    //             if(c_row.slot3_status =='booked'){
                    //                 Table.get_cust_id(c_row.table_id,slot).then((answer2) => {
                    //                     p2.push(answer2.rows[0]);
                    //                 });
                    //             }
                    //         }
                    //     }
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