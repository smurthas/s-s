var express = require('express');
var request = require('request');
var gdata = require('gdata-js');

var app = express();
app.use(express.bodyParser());

var url = 'https://spreadsheets.google.com/feeds/list/' +
           process.env.DOC_KEY + '/' + process.env.WKSHT_KEY + '/private/full';

var gclient = gdata(process.env.G_CLIENT, process.env.G_SECRET, '');
gclient.setToken({
  access_token:process.env.ATOK,
  refresh_token:process.env.RTOK
});

//CORS middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/sheets', function(req, res) {
  gclient.getFeed('https://spreadsheets.google.com/feeds/worksheets/' + process.env.DOC_KEY + '/private/full',{}, function(err, body) {
    if (err) return res.send(err, 500);
    res.send(body);
  });
});

app.post('/rsvp', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  gclient.post({uri:url,
    body:'<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">' +
           '<gsx:name>' + name + '</gsx:name>' +
           '<gsx:email>' + email + '</gsx:email>' +
           '<gsx:weddingattendees>' + number + '</gsx:weddingattendees>' +
           '<gsx:rehersalattendees>' + number + '</gsx:rehersalattendees>' +
         '</entry>',
    headers: {'Content-Type': 'application/atom+xml'},
    qs: {
      alt: 'json'
    },
    json: true
  }, function(err, body) {
      if (err) {
        console.error(err);
        return res.json(err, 500);
      }
      res.json(body);
  });
});
/*
function saveToken(token, callback) {
  var p = {
    uri:'https://api.singly.com/proxy/dropbox/files_put/dropbox/gdocs_token.txt',
    qs: {
      access_token:
    }
    json: token
  request.put
}*/

app.listen(process.env.PORT || 8553);
