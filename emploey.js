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

    col.find({},{projection: { _id:0,firstName: 1,lastName: 1,phone: 1 }}).toArray(function (err, result) {
      console.log(err);
      console.log(result);
      if (err) {
        res.send('<b>error</b>');
      } else {
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
    col.find({tz:req.params.id}).toArray(function (err, result) {
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
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('emploey');
    // Insert a bunch of documents
    col.updateOne(({tz:req.params.id},{$set:{tz:"22222"}}),function(err, result){
      if (err) {
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});


mainRouter.post('/addEmploey',function (req, res) {
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
        res.send('<b>error</b>');
      } else {
        res.send('<b>sucess</b>');
      }
    })
  });
});

module.exports = mainRouter;