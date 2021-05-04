// Note: while creatng relations the fruit needs to be freshly
// created for the ObjectID's to match, if we try to add the favourite
// fruit as one that already existed in the database
// then the Object ID's don't match, if we want to match with one that already exists then use nested, scroll to see more




// With mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});
// This creates a connection to the database given after the last /

const fruitSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Name not specifiedddd"]},
  rating:{
    type: Number,
    min: 1,
    max: 10
    //Defines range of values
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);
// Creates a collection that follows the schema with the name that is a plural version
// and in lower case of what we've specified in double quotes(using lodash)

// const fruit=new Fruit({
//   name:"Apple",
//   rating: 55,
//   // This is a fatal error(changed rating to 55)as it fails validation, therefore the fruit will not be added again
//   review: "Pretty decent as a fruit"
// });

// const random=new Fruit({
//   rating: 6,
//   // This is a fatal error(changed rating to 55)as it fails validation, therefore the fruit will not be added again
//   review: "Pretty decent as a fruit"
// });
//
// random.save();
// used to insert ONE, everytime you run this line it will save the same thing again

const grapes=new Fruit({
  name:"grapes",
  rating: 10,
  review: "Best fruit ever"
});

const mango=new Fruit({
  name:"mango",
  rating: 8,
  review: "Very good but can be sour sometimes"
});

const orange=new Fruit({
  name:"orange",
  rating: 6,
  review: "Very sour! Only good in juiced form with way too much sugar"
});

// Fruit.insertMany([grapes, mango, orange], function(err){
//   //Unlike assert, which add items even if the number of
//   // items added and the number of items declared to be added
//   // is not equal, here the names in brackets have to be exacyly
//   // equal to the name of the objects(obv) for any insertion to take place
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });
//Used to insert many items

const strawberry=new Fruit({
  name:"strawberry",
  rating: 10,
  review: "Very good but can be sour sometimes"
});
// strawberry.save();
// Fruit.deleteOne({name:"strawberry"},function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Succesfully deleted ")
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    consile.log(err);
  }
  else{
    // mongoose.connection.close();
    //Good practuce to close the connection once we're done with what we want to find
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
    // console.log(fruits);
  }
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});
const Person = mongoose.model("Person",personSchema);
//Here too a collection is created with the plural
//verion(it made it people omgggg) following the person schema

const person = new Person({
  name: "Akanksha",
  age: 21
});

// person.save();
const john = new Person({
  name:"John",
  age:27,
  favouriteFruit: strawberry
});
// john.save();
const banana=new Fruit({
  name:"Banana",
  rating:7,
  review:"Have a weird texture"
});
// banana.save();
const Ketan=new Person({
  name:"Ketan",
  age:21,
  favouriteFruit:banana
});
// Ketan.save();
const raspberry=new Fruit({
  name:"Raspberry",
  rating:10,
  review:"Berrilicious!"
});
// raspberry.save();

// Person.updateOne({name:"Akanksha"},{favouriteFruit:raspberry},function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Succesfully updated Akanksha's favourite fruit");
//   }
// });
//first find the fruit we wanna use


//Use this method to to create a relationship between existing documents
        Fruit.findOne({name: "grapes"}, function(err, fruit){

            if(err){
              console.error(err);
            }

            //add it as a favourite fruit
            Person.updateOne({name: "Akanksha"}, {favouriteFruit: fruit}, function(err) {
             //will log if it updated successfully
             console.log("Succesfully updated Akanksha's favourite fruit");
            });

        });


// Without mongoose


// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url,{useUnifiedTopology:true});
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//   insertDocuments(db, function() {
//       client.close();
// });
// // findDocuments(db, function() {
// //       client.close();
// //     });
// });
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([
//     {
//       name:"Apple",
//       score:8,
//       review:"Great!"
//     },
//     {
//       name:"Banana",
//       score:9,
//       review:"Nice!"
//     },
//     {
//       name:"Orange",
//       score:6,
//       review:"Kinda sour!"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     // Validate to make sure there are no errors
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     // Validate to make sure that 3 items have been added
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
// // const findDocuments = function(db, callback) {
// //   // Get the documents collection
// //   const collection = db.collection('fruits');
// //   // Find some documents
// //   collection.find({}).toArray(function(err, fruits) {
// //     assert.equal(err, null);
// //     console.log("Found the following records");
// //     console.log(fruits)
// //     callback(fruits);
// //   });
// // }
