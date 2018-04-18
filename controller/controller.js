var models = require('../model/model.js');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = function (app,io){
    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({     
        extended: true
    }));

    app.get('/chartdata',function(req,res){

            models.Data.find({},function(err,doc){
                if(err){
                    res.json(err);     
                }
                else{
                    console.log("data Found"+__dirname);    
                    res.send("success")
                }
            })
    });
    
    app.get('/',function(req,res){
        res.sendFile(path.resolve(__dirname+"/../views/index.html"));
    });
    
    app.post('/register',function(req,res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        var user={
            "name":req.body.name,
            "loginid":req.body.loginid,
            "password":req.body.password
        };
        console.log(user);
        
        models.user.findOne({"loginid":req.body.loginid},function(err,doc){
            if(err){
                res.json(err); 
            }
            if(doc == null){
                models.user.create(user,function(err,doc){
                    if(err) res.json(err);
                    else{
                        res.send("success");
                    }
                });
            }else{
                res.send("User already found");
            }
        })
        
    });
    
    
    var loginid=null;
    var users={};
    var keys={};
    
    app.post('/login',function(req,res){
        console.log(req.body.loginid);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        loginid = req.body.loginid;
        models.user.findOne({"loginid":req.body.loginid, "password":req.body.password},function(err,doc){
            if(err){
                res.send(err); 
            }
            if(doc==null){
                res.send("User has not registered");
            }
            else{
                console.log("user Found"+__dirname);
//                res.sendFile(path.resolve(__dirname+"/../views/chat1.html"));
                res.send("success");
            }
            
    });
    });
}