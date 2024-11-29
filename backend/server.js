import express from 'express'
import dotenv from 'dotenv'
import { MongoClient,ObjectId } from 'mongodb'
import bodyparser from 'body-parser'
import cors from 'cors'

dotenv.config()


// Connecting to the MongoDB Client
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = "PassVault"
const app = express()
const port = 3000 

// Middleware
app.use(bodyparser.json())
app.use(cors())


// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
// Update a password by id
app.put('/', async (req, res) => {
    const { id, site, username, password } = req.body; // Extract the updated data
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Match by ID
            { $set: { site, username, password } } // Update fields
        );
        res.send({ success: true, result });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send({ success: false, error: "Failed to update the password" });
    }
});


// Save a password
app.post('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
})

// Delete a password by id
app.delete('/', async (req, res) => { 
    const { id } = req.body;  // Extract id from the request body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne({ _id: new ObjectId(id)}); // Use ObjectId constructor for id
    res.send({success: true, result: findResult})
  })



app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})