const express=require('express');
const router=express.Router();
const {createPool}=require('mysql');
const {sign} =require('jsonwebtoken');
const tokenVerify=require('./verifyToken');

const pool=createPool({
	host:'localhost', 
	user:'root', 
	password:'', 
	database:'test', 
	connectionLimit:10
});

router.get('/',(req,res) =>{
	 res.send('ok done');
});

router.get('/data',tokenVerify,(req,res) =>{
	pool.query('select * from register',(err,result)=>{
		if(err){
			res.json({message:'db error'});
			}
		  res.json({message:result});
   });
});

//two way see niche
//app.use(express.json());
//up side method for body convert in json
router.post('/register',express.json(),(req,res)=>{
	pool.query(`insert into register(username,email,password) values (?,?,?)`,
                        [req.body.username,req.body.email,req.body.password],
                       (err,result)=>{
                       	if(err){
                       	res.json({message:'db error'});
                       	}
                         res.json({message:result});
                        });
});

router.post('/login',express.json(),(req,res)=>{
	pool.query(`select * from register where email=? AND password=?`,
                        [req.body.email,req.body.password],
                        (err, result)=>{
                        	if(err){
                        	res.json({message:'db error'});
                        	}
                        if(result.length==0) {
                        	res.json({message:'invalid email or password'});
                        	}
                        result.password=undefined;
                        const jsontoken=sign({results:result},'qwe1234',{
                        	 expiresIn:'1h'
                        });
                        res.json({token:jsontoken,message:result});
                       });
});

module.exports=router;