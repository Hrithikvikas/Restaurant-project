const Table = require('../../models/tables');

exports.get_avl_tables = (req,res,next) =>{
    // console.log('chse the slot');
    const { cookies } =req;
    // console.log(cookies);
    if('user_id' in cookies){
        // console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            // const slotno=req.params['slot_no'];
            const slotno=cookies.slot_no;
            // console.log('slot_no:'+slotno);
            if(slotno==1 || slotno==2 || slotno==3){
            Table.get_all_avl_tables(slotno).then((answer1) => {
                res.render('./customer/booktable', {
                    pageTitle: 'Book Table',
                    path: '/customer/booktable',
                    tables: answer1.rows,
                    slotno: slotno
                });
            })
            }
            else{
                res.send('No such slot');
                res.redirect('/customer/tables');
            }
        }
        else{
            res.redirect(cookies.account_type+'/home');
        }
    }
    else{
        res.redirect('/login');
    }
    
    
};


exports.post_select_table =(req,res,next) => {
    const { cookies } =req;
    // console.log(cookies);
    if('user_id' in cookies){
        // console.log('works after selecting table')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='customer'){
            // const slotno=req.params['slot_no'];
            const slotno=cookies.slot_no;
            // console.log('post_slot_no:'+slotno);
            const tableid=req.body.table_id;
            //check if the table is available at the time of selecting again here.
            Table.check_table(slotno,tableid).then((answer1) =>{
                if(answer1.rowCount!=0){
                    Table.add_booking(cust_id,slotno,tableid).then((answer2) => {
                        Table.update_table(cust_id,slotno,tableid).then(() =>{
                            res.clearCookie('slot_no');
                            res.redirect('/customer/tables');
                        });
                    })
                }
                else{
                    res.send('Table not available');
                    res.redirect('/customer/booktable');
                }
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