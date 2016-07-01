var express = require('express');
var bodyParse = require('body-parser');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('contactlist', ['contactlist'])
//Tell express  where to look for files
app.use(express.static(__dirname+"/public"));
app.use(bodyParse.json());
app.get('/contactlist', function (req , res) {
    console.log("I got a request");
    db.contactlist.find(function (err, docs) {
      if(!err)
      {
        console.log(docs);
        res.json(docs);
       }
    });
   //glue the model to the view 
});
app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function (err, doc) {
    res.send(doc);
  })
});
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id + "from the server");  
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req,res) {
    var id = req.params.id;
    db.contactlist.findOne({_id : mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
});
app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set : {name:req.body.name , email:req.body.email , number:req.body.number}},
    new: true}, function (err, doc) 
    {
      res.send(doc);
    });
});

app.listen(8080);
console.log("Listening to 8080");