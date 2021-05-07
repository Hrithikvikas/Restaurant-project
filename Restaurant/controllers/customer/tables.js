const Table=require('../../models/tables');

exports.get_cust_table =(req,res,next) =>{//we need to get the information of the slot
    Table.get_customer_table(customer_id).then((answer1) => {
        res.render('customer/tables',{
            path: '/customer/tables',
            tables_booked: answer1.rows,

        });
    })
};



//this is used when we choose a slot and redirected to booktable page.(i.e press book this table button on table booking page.)
exports.post_choose_slot= (req,res,next) =>{
    
    const slotno=req.body.slotno;
    const date=req.body.date;
    Table.get_avl_tables().then((answer1) =>{
        res.redirect('/customer/booktable/:'+slotno); //also store the slotno here.
    })
    //here confirm whether 
};