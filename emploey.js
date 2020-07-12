const express = require('express');
const mainRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;

mainRouter.get('/GetEmploeyDetails_phone_and_name', function (req, res) {
  console.log("hi")
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, function (err, client) {
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('emploey');
    // Insert a bunch of documents

    col.find({},{projection: { _id:0,firstName: 1,lastName: 1, phone: 1 }}).toArray(function (err, result) {
      console.log(err);
      console.log(result);
      if (err) {
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});

mainRouter.get('/GetFullDetails/:id', function (req, res) {
  console.log(req.params.id)
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, function (err, client) {
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('emploey');
    // Insert a bunch of documents
    col.findOne({ tz: req.params.id },function (err, result) {
      if (err) {
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});



mainRouter.get('/deleteEmp/:id', function(req, res) {
  console.log(req.params.id)
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, function (err, client) {
    const col = client.db(dbName).collection('emploey');
    var myquery = { tz: req.params.id };
    var newvalues = { $set: { firstName: "new name" } };
    col.updateOne(newvalues,myquery,function(err, result){
      if (err) {
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});








mainRouter.post('/addEmploey', function (req, res) {
  console.log(req.body)
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, function (err, client) {
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('emploey');
    // Insert a bunch of documents
    col.insert(req.body, function (err, result) {
      console.log(err);
      console.log(result);
      if (err) {
        result.send('<b>error</b>');
      } else {
        result.send('<b>sucess</b>');
      }
    })
  });
});

module.exports = mainRouter;