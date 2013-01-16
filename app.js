var express = require('express');
var request = require('request');

var app = express();
app.use(express.bodyParser());

var DOC_KEY = process.env.DOC_KEY;
var WKSHT_KEY = process.env.WKSHT_KEY;
var ATOK = process.env.ATOK;

var url = 'https://spreadsheets.google.com/feeds/list/' +
           DOC_KEY + '/' + WKSHT_KEY + '/private/full?access_token=' + ATOK

app.get('/', function(req, res) {
  res.json({hello:'world'});
});

app.post('/rsvp', function(req, res) {
  console.error('req', req.body);
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  request.post({uri:url,
    body:'<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">' +
           '<gsx:name>' + name + '</gsx:name>' +
           '<gsx:email>' + email + '</gsx:email>' +
           '<gsx:totalnumberofattendees>' + number + '</gsx:totalnumberofattendees>' +
         '</entry>',
    headers: {'Content-Type': 'application/atom+xml'}},
    function(err, resp, body) {
      if (err) res.json(err, 500);
      if (err) console.error(err);
      console.error('resp.statusCode', resp.statusCode);
      console.error('body', body);
      res.json({success:true});
  });
});


app.listen(process.env.PORT || 8553);
