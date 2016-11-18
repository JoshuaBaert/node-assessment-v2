/**
 * Created by Joshua Baert on 11/18/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');


var accounts = require('./accounts.json');


var app = express();

app.use(bodyParser.json());


app.get('/api/accounts', function (req, res, next) {
	var query = req.query;
	var queried = false;
	var keys = [];
	console.log(query);
	
	for (var key in query) {
		queried = true;
		if (key === 'firstname') keys.push('first_name');
		if (key === 'cardtype') keys.push('card_type');
		if (key === 'lastname') keys.push('last_name');
		if (key === 'balance') keys.push('balance');
	}
//	console.log(query);
	if (queried) {
		
		rtn = accounts.filter(function (e, i) {
			return query[key[0]] === accounts[i]
		});
		
		
		res.json(rtn);
	} else {
		res.json(accounts);
	}
});

app.get('/api/accounts/:id', function (req, res, next) {
	var id = req.params.id;
	var found = false;
	accounts.map(function (e, i) {
		if (accounts[i].id == id) {
			res.json(e);
			found = true;
		}
	});
	if (!found) {
		res.sendStatus(404)
	}
});


app.post('/api/accounts', function (req, res, next) {
//	console.log(req.body);
	var newAcct = req.body;
	newAcct.id = accounts.length + 1;
	accounts.push(newAcct);
	res.sendStatus(200);
});



/*
 app.post('/api/accounts/cardtype/:id',function (req, res, next) {
 accounts.map(function (e,i) {
 if (e.id == req.params.id) {
 e.card_type = req.body.card_type;
 res.sendStatus(200);
 }
 })
 });
 */



/*
 app.post('/api/accounts/approvedstates/:id', function (req,res,next) {
 if(req.params.id) {
 var id = req.params.id;
 console.log(req.params);
 var state = req.query.state;
 console.log(req.query);
 
 accounts.map(function (e,i) {
 if (accounts[i].id == id) {
 accounts[i].approved_states.push(state);
 console.log(accounts[i]);
 res.sendStatus(200);
 }
 });
 } else {
 res.sendStatus(400);
 }
 });
*/



/*
 app.delete('/api/accounts/:id', function (req, res, next) {
 var id = req.params.id;
 console.log('delete id = ' + id);
 
 
 accounts.map(function (e,i) {
 if (id == accounts[i].id) {
 accounts.splice(i,1);
 res.sendStatus(200)
 }
 })
 });
 */



/*
app.delete('/api/accounts/approvedstates/:id', function (req, res, next) {
	var id = req.params.id;
	console.log(req.params);
	var state = req.query.state;
	console.log('delete state is ' + state);
	
	accounts.map(function (e, i) {
		if (accounts[i].id == id) {
			for (var j = 0; j < accounts[i].approved_states.length; j++) {
				if (accounts[i].approved_states[j] == state) {
					accounts[i].approved_states.splice(j,1)
					res.sendStatus(200)
				}
			}
		}
	});
	
});
*/


app.listen(3000, function () {
	console.log('Listening on port 3000');
	console.log(accounts[0]);
});

module.exports = app;