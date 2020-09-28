const express=require('express');
const app=express();
const router=require('./main.js');

app.use('/api',router);

app.get('/',(req,res) =>{
	res.send('welcom To JWT Token practice');
});

app.listen(3000,()=>{
	console.log('server run at \t http://localhost:3000');
	});