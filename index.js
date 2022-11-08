const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://photoguru:NaV2k6tBvUfurLsu@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const productCollection = client.db('photoguru').collection('products');
        app.get('/products', async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.limit(3).toArray();
            res.send(products);
        })

        app.get('/allproducts', async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally{

    }
}

run().catch(err => console.log(err))


app.get('/', (req,res)=>{
    res.send('api is running');
})

//user : photoguru
// NaV2k6tBvUfurLsu
app.listen(port, ()=>{
    console.log(`you api is running on port : ${port}`)
})