const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://photoguru:NaV2k6tBvUfurLsu@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req,res)=>{
    res.send('api is running');
})

//user : photoguru
// NaV2k6tBvUfurLsu
app.listen(port, ()=>{
    console.log(`you api is running on port : ${port}`)
})