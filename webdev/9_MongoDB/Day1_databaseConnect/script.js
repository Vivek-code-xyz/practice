const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://khasiyavivek97123_db_user:K3ABEs7rnXSydFy8@cluster1.zmerf1l.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'VivekDB';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Fetch Data from Collection
  " const findResult = await collection.find({}).toArray();   "        //here collection.find({}) is a curser and .toArray() actually do the Network call
  //causen : do no use .toArray network call..cause it fetch entire data of DB into RAM and you Ram will be Ram-Ram
  // you can make network call via for loop which takes objects(docs) from collection one by one via curser
  
 /* const findresult = collection.find({})  //curser is initialise and points the first docs of collection
  
  for await(let docs of findresult){      //actuall network call
        console.log(docs)
        //code or logic to do something on each datadocs
    }*/

// console.log('Found documents =>', findresult);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /*//insert data into DB
    const insertResult = await collection.insertOne({name:"Kirtan",age:12,Gender:"M"});
    const insertMany = await collection.insertMany([{name:"het",age:23},{name:'raj',age:21}])
    console.log('Inserted documents =>', insertMany);  */ 

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
    Delete the Document
    const deleteResult = await collection.deleteMany({name:"Kirtan"});
    const deleteresult = await collection.deleteMany({name:"raj"});
    console.log('Deleted documents =>', deleteResult);
    // this is delete with field filter
    */

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /*
    Update Document

    const updateResult = await collection.updateOne({ name : "vivek" }, { $addToSet : {hobby:"Gaming"}});
    console.log('Updated documents =>', updateResult);

    */

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* Find Document With Filters 

const filteredDocs = await collection.find({name:"vivek"}).toArray();
console.log('Found documents filtered by { a: 3 } =>', filteredDocs);
*/

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  Index on Perticular Field of the Collection 
    const indexName = await collection.createIndex({gender:"M"});
    console.log('index name =', indexName);
*/
return 'done.';

}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());