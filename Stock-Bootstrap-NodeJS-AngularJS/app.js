var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;
var https = require('https');
var upload = multer();
var xml = '';

var app = express();


// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//GET Price Volume data
app.get('/priceVolume/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.symbol + '&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});

app.get('/priceVolumeFull/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.symbol + '&outputsize=full&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//Auto Complete API
app.get('/autoComplete', function(req, res){
   var symbol = req.param('alphabet');
   fetch('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='+ symbol)
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET SMA data
app.get('/SMA/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=SMA&symbol=' + req.params.symbol + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET EMA data
app.get('/EMA/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=EMA&symbol=' + req.params.symbol + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET STOCH data
app.get('/STOCH/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=STOCH&symbol=' + req.params.symbol + '&slowkmatype=1&slowdmatype=1&interval=daily&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET RSI data
app.get('/RSI/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=RSI&symbol=' + req.params.symbol + '&interval=daily&time_period=10&series_type=close&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET ADX data
app.get('/ADX/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=ADX&symbol=' + req.params.symbol + '&interval=daily&time_period=10&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET CCI data
app.get('/CCI/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=CCI&symbol=' + req.params.symbol + '&interval=daily&time_period=10&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET BBANDS data
app.get('/BBANDS/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=BBANDS&symbol=' + req.params.symbol + '&nbdevup=3&nbdevdn=3&interval=daily&time_period=5&series_type=close&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});


//GET BBANDS data
app.get('/BBANDS/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=BBANDS&symbol=' + req.params.symbol + '&nbdevup=3&nbdevdn=3&interval=daily&time_period=5&series_type=close&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});

//GET MACD data
app.get('/MACD/:symbol', function(req, res){
   fetch('https://www.alphavantage.co/query?function=MACD&symbol=' + req.params.symbol + '&interval=daily&series_type=close&apikey=TYWWC92JUZSR9DOQ')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        res.send(body);
    });
});

//GET NEWS data

function xmlToJson(url, callback) {
  var req = https.get(url, function(res) {
    var xml = '';

    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    });

    res.on('timeout', function(e) {
      callback(e, null);
    });

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}

app.get('/NEWS/:symbol', function(req, res){
   var url = 'https://seekingalpha.com/api/sa/combined/' + req.params.symbol + '.xml'
   xmlToJson(url, function(err, data) {
        if (err) {
          // Handle this however you like
          return console.err(err);
        }
        var a = JSON.stringify(data, null, 2);
        // Do whatever you want with the data here
        // Following just pretty-prints the object
        console.log(JSON.stringify(data, null, 2));
        res.send(a);
      });
});

});
app.listen(3000);
