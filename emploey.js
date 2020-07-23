const express = require('express');
const mainRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;

//פרטי כל העובדים : טלפון שם פרטי ומשפחה
mainRouter.get('/GetEmploeyDetails_phone_and_name', function (req, res) {
  console.log("hi")
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, client) {
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('emploey');
    // Insert a bunch of documents
    col.find({}, { projection: { _id: 0, firstName: 1, lastName: 1, phone: 1 } }).toArray(function (err, result) {
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
//פרטים של עובד יחיד לפי ת.ז
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
    col.findOne({ tz: req.params.id }, function (err, result) {
      if (err) {
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});
//עדכון לכולם
mainRouter.put('/UPDATEALL', function (req, res) {
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, function (err, client) {
    const col = client.db(dbName).collection('emploey');
    var newvalues = { $set: { isactive: false } };
    col.update(newvalues, function (err, result) {
      if (err) {
        throw err;
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});
//מחיקת עובד
mainRouter.post('/deleteEmp', function(req, res) {
  console.log(req.body.id);
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('emploey');
    var myquery = { tz: req.body.id };
    var newvalues = { $set: { "isactive": "false"} };
    col.findOneAndUpdate(myquery,newvalues,function(err, result){
      if (err) {
        res.send('<b>error</b>');
      } else {
        console.log(result);
        res.send(result);
      }
    })
  });
});
//הוספת עובד
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