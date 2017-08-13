var express = require('express');  
var app = express();  
  
app.use(express.static("App"));  
  
app.get('/', function (req, res) {  
    res.redirect('/');  
});  
  
var port = process.env.PORT || 5859;
var url = process.env.HOST || '0.0.0.0';

app.listen(port,url);

console.log('Started on Port :'+port+', URL :'+url);
