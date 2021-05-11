const Kitch =require('../../models/kitchen');

exports.get_test = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        const cust_id=cookies.user_id;
        if(cookies.account_type=='kitchen'){
			Kitch.get_total_dinein().then((answer1) => {
				console.log('check1:'+answer1);
				Kitch.get_total_online().then((answer2) => {
					var p1=answer1.rows;
					var p2=answer2.rows;
					var pend_dinein=p1;
					var pend_online=p2;
					res.render('kitchen/home', {
						pageTitle: 'Home',
						path: '/kitchen/home',
						cat1_name: 'Dine In',
						cat2_name: 'Online',
						cat1: pend_dinein,
						cat2: pend_online,
						kitchen_id: req.body.details, 
					});
				});
			})
		}else{
			res.redirect(cookies.account_type+'/home');
		}
	}else{
		res.redirect('/login');
	}
}

//we have order_finished button
exports.post_test = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        console.log('correct page')
        if(cookies.account_type=='kitchen'){
			const order_id=parseInt(req.body.order_id);
			console.log(typeof order_id);
			if(order_id<1000000){
			console.log('entered if loop');	
				Kitch.update_dinein(order_id).then((answer1) =>{
					res.redirect('/kitchen/home');
				})
			}
			else{
				const dest = req.body.order_dest;
				Kitch.update_online(order_id).then((answer1) =>{});
				console.log("update online working");
				Kitch.get_address(order_id).then((answer1)=>{
					Kitch.get_free_delivery_primary(answer1.rows[0].order_dest).then((answer2)=>{
						if(answer2.rows.length > 0){
							Kitch.order_allot(answer2.rows[0].delivery_person_id, order_id).then((answer5)=>{});
							Kitch.set_delivery(answer2.rows[0].delivery_person_id).then((answer4)=>{});
						}else{
							Kitch.get_free_delivery_secondary(answer1.rows[0].order_dest).then((answer3)=>{
								if(answer3.rows.length > 0){
									//console.log(answer3.rows[0].delivery_person_id);
									Kitch.order_allot(answer3.rows[0].delivery_person_id, order_id).then((answer5)=>{});
									//console.log("reached line 65");
									Kitch.set_delivery(answer3.rows[0].delivery_person_id).then((answer4)=>{});
									//console.log("reached line 67");
								}else{
								}
							});
						}
					});
				});
				res.redirect('/kitchen/home');
			}
		}
		else{
			res.redirect(cookies.account_type+'/home');
		}
	}else{
		 res.redirect('/login');
	}
};
