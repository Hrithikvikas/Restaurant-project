const Deliv =require('../../models/delivery');
const Kitch =require('../../models/kitchen');

exports.get_test = (req,res,next) => {
	const { cookies } =req;
    console.log(cookies);
    if('user_id' in cookies){
        //console.log('correct page')
        //const cust_id=cookies.user_id;
        if(cookies.account_type=='delivery'){
        	Deliv.get_total_orders(cookies.user_id).then((answer1)=>{
			p1 = answer1.rows;
			//console.log(p1);
			res.render('delivery/home',{
				pageTitle: 'Home',
				path: '/delivery/home',
				c1: p1,
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

exports.post_test = (req,res,next) => {
	//do we need recipe id?
    const { cookies } =req;
    //console.log(cookies);
    //console.log("reached line 30");
    if('user_id' in cookies){
    	//console.log("reached line 32");
        //const cust_id=cookies.user_id;
        //console.log(cookies.account_type);
        if(cookies.account_type=='delivery'){
        	//write this req.body.order_id in terms of cookies
        	console.log("reached line 35");
        	//console.log(req.body.order_id);
			Deliv.set_order(req.body.order_id).then((answer1)=>{
				var kk = cookies.user_id;
				Deliv.get_orders_count(kk).then((answer8)=>{
					console.log(answer8.rowCount);
					if(answer8.rows.length>0){
						console.log("still there are orders to deliver");
					}
					else{
						Deliv.get_primary_address(kk).then((answer6)=>{
							Kitch.get_pend_delivery(answer6.rows[0].primary_address).then((answer7)=>{
								console.log("line 49");
								console.log(answer7.rows);
								if(answer7.rows.length>0){
									var temp = answer7.rows;
									console.log("reached line 50");
									temp.forEach(function(c_row){
										Kitch.order_allot(kk, c_row.order_id).then(()=>{});										
									});
									//Kitch.set_delivery_busy(kk).then(()=>{});
									console.log("reached line 58");
								}else{
									Deliv.get_secondary_address(kk).then((answer8)=>{
										//console.log("line 61");
										Kitch.get_pend_delivery(answer8.rows[0].secondary_address).then((answer9)=>{
											if(answer9.rows.length>0){
												var temp = answer9.rows;
												temp.forEach(function(c_row){
													Kitch.order_allot(kk, c_row.order_id).then(()=>{});										
												});
												//Kitch.set_delivery_busy(kk).then(()=>{});
											}else{
												//console.log("reached line 68");
												Deliv.set_delivery(kk).then((answer5)=>{});
											}
										});
									});
								}								
							});	
						});
					}
				//console.log("reached line 79");
				res.redirect('/delivery/home');	
				});
			});
		}else{
			console.log("reached line 84");
			res.redirect(cookies.account_type+'/home');
		}
	}
	else{
		res.redirect('/login');
	}
}