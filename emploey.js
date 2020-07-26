const express = require('express');
const mainRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;

//פרטי כל העובדים : טלפון שם פרטי ומשפחה
mainRouter.get('/GetEmploeyDetails_phone_and_name', function (req, res) {
  console.log("hi")
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
    col.find({ isactive: "true" }, { projection: { _id: 0, firstName: 1, lastName: 1, phone: 1 } }).toArray(function (err, result) {
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

mainRouter.post('/getDetailsOfhouers', function (req, res) {
  var myQuery = { tz: req.body.id };
  const url = 'mongodb://localhost:27017';
  const dbName = 'clocker';
  MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }, function (err, client) {
      const col = client.db(dbName).collection('emploey');
      col.findOne(myQuery,{projection:{houersWorks:1}},function (err, result) {
          if (err) {
              res.send('<b>error</b>');
          } else {
              res.send(result);
          }
      }
      );
  });
});

//עדכון פרטי עובד
mainRouter.post('/Update', function (req, res) {
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('emploey');
    var myquery = { tz: req.body.tz };
    var newVal = {
      $set:
      {
        tz: req.body.tz,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        mail: req.body.mail,
        isactive: req.body.isactive,
      }
    }
    col.findOneAndUpdate(myquery, newVal, function (err, result) {
      console.log(result);
      res.send(result);
    })
  });
});



//בדיקה האם קיים לפי תז
//והחזרת הנתונים שלו
mainRouter.post('/checkIfExist', function (req, res) {
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('emploey');
    var myquery = { tz: req.body.id };
    col.findOne(myquery, function (err, result) {
      console.log(result);
      res.send(result);
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
mainRouter.post('/deleteEmp', function (req, res) {
  var emploeys = null;
  // Connection url
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'clocker';
  // Connect using MongoClient
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const col = client.db(dbName).collection('emploey');
    var myquery = { tz: req.body.id };
    var newvalues = { $set: { "isactive": "false" } };
    col.findOneAndUpdate(myquery, newvalues, function (err, result) {
      if (err) {
        res.send('<b>error</b>');
      } else {
        if (result.value == null) {
          console.log("result=null")
          res.send("no emploey");
        }
        else {
          console.log("result!=null")
          res.send(result);
        }
      }
    })
  });
});

module.exports = mainRouter;