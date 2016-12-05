const express = require('express');
const app = express();
const moment = require('moment');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req,res) =>  {
	res.render('index');
});

app.get('/:str', (req,res) => {

	const timestampStr = req.params.str;

	let validNatural = (new Date(timestampStr)).getTime() > 0;
	let validUnix = isNaN(timestampStr);

	if( validNatural || !validUnix){
		if( !isNaN(timestampStr)){
			res.json({
				"unix": timestampStr,
				"natural": toNaturalDate()
			});
		}
		else{
			res.json({
				"unix": toUnixDate(),
				"natural": timestampStr
			});
		}
	}
	else {
		res.json({
			"unix": null,
			"natural":null
		});
	}

	function toUnixDate(){
		let date = new Date(timestampStr);
		return (date.getTime())/1000;
	};

	function toNaturalDate(){
		let dateInMili = new Date(timestampStr*1000);
		var months = ['January','February','March','April','May','June',
    			  'July','August','September','October','November',
    			  'December'];
		return months[dateInMili.getUTCMonth()]+" "+dateInMili.getUTCDate()+", "+
				  dateInMili.getUTCFullYear();
	};
	



});

app.listen(8080, function(){
	console.log("app listening on port 8080");
});
