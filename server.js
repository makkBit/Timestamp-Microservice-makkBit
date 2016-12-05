const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req,res) =>  {
	res.render('index');
});

app.get('/:str', (req,res) => {
	// let time = new Date(req.params);
	// console.log(decodeURIComponent(t=req.params));
	// console.log(Date.parse(time));
	// res.send("hello");
	console.log(req.params.str);
	var value = req.params.str;
	console.log(new Date(value));
	var date = new Date(value);
	console.log(date.getTime());
	
});

app.listen(8080, function(){
	console.log("app listening on port 8080");
});
