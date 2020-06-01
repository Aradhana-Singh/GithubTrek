var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.render("landing");
});

app.get('/explore' , function(req,res){
    res.render("explore" , {data : null});
});
app.post('/explore' , function(req,res){
    var userName = req.body.userName;
    if(userName == ""){
        res.render("explore" , {data : null});
    }
    else{
        var url = "https://api.github.com/users/" + userName;
        request({url : url , headers: {'User-Agent': 'request'} }, function(err, response, data){
            
                var data = JSON.parse(data);
                if(data.message == 'Not Found'){
                    res.render("explore" , {data : null});
                }
                else{
                    res.render("explore" , {data : data});
                }
        });
    }
});
app.listen(5500 , function(){
    console.log("Server Started");
});