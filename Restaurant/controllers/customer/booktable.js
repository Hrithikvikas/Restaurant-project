const Table = require('../../models/tables');

exports.get_avl_tables = (req,res,next) =>{
    const slotno=req.params['slot_no'];
    if(slotno==1 || slotno==2 || slotno==3){
    Table.get_all_avl_tables(slotno).then((answer1) => {
        res.render('./customer/booktable', {
            // customer_id,
            path: '/customer/booktable',
            avlbl_tables: answer1.rows,
            slotno
        });
    })
    }
    else{
        res.redirect('/customer/tables');
    }
};
//I dont think a get method is needed

exports.post_select_table =(req,res,next) => {

    const slotno=req.params['slot_no'];
    const tableid=req.body.table_id;

    //check if the table is available at the time of selecting again here.
    Table.check_table(slotno,tableid).then((answer1) =>{
        if(answer1.rowCount!=0){
            Table.update_table(slotno,tableid).then(() =>{
                res.redirect('/customer/tables');
            });
        }
        else{
            res.redirect('/customer/booktable/:'+slotno);
        }
    })
};