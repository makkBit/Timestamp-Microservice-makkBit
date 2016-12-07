const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

//configures pug
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
		//the query is unix timestamp
		if( !isNaN(timestampStr)){
			res.json({
				"unix": timestampStr,
				"natural": toNaturalDate()
			});
		}
		//the query is natural lang
		else{
			res.json({
				"unix": toUnixDate(),
				"natural": timestampStr
			});
		}
	}
	//the query is neither unix nor natural timestamp
	else {
		res.json({
			"unix": null,
			"natural":null
		});
	}

	function toUnixDate(){
		let date = new Date(timestampStr);
		date.setDate(date.getDate()+1);
		//milliseconds to seconds
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

app.listen(port, function(){
	console.log("app listening on port: "+port);
});
