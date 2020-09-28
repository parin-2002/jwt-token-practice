const jwt=require('jsonwebtoken');

function tokenVerify(req,res,next)
{
	let token=req.get('authorization');
	//get token from client side
    if(token){
    	//console.log(token);
    	//token=token.slice(7);
        //Remove Bearer from string Bearer is token type and it write in first type+token so remove type
        jwt.verify(token,'qwe1234',(err,decoded)=>{
        	if(err){ return res.json({ success:0,message:'invalid token'}); }
            else{ //console.log(req.decoded);
                    req.decoded = decoded;
                  //  console.log(req.decoded);
                    next(); }
        });   
    }
  else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
}

module.exports=tokenVerify;