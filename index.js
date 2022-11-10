const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID, ObjectId } = require('bson');


app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://photoguru:NaV2k6tBvUfurLsu@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const productCollection = client.db('photoguru').collection('products');
        const reviewCollection = client.db('photoguru').collection('review');
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
        app.post('/allproducts', async(req, res)=>{
            const user = req.body;
            const result = await productCollection.insertOne(user);
            console.log(result);
            res.send(user);
        })
        app.get('/allproducts/:id', async(req,res)=> {
            const id = req.params.id;
            const query = { _id : ObjectId(id)}
            const result = await productCollection.findOne(query);
            res.send(result);
         })

         app.get('/reviews', async(req,res)=>{
            let query = {};
            if(req.query.id){
                query = {
                    productId : req.query.id
                }
            }
            
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
         })
         
         app.get('/addreview/:id', async(req,res)=> {
            const id = req.params.id;
            const query = { _id : ObjectId(id)}
            const result = await productCollection.findOne(query);
            res.send(result);
         })
         app.post('/reviews', async(req, res)=>{
            const user = req.body;
            const result = await reviewCollection.insertOne(user);
            console.log(result);
            res.send(user);
        })
        app.delete('/review/:id', async(req,res)=>{
            const data = req.params.id;
            const query = {_id : ObjectId(data)};
            const result = await reviewCollection.deleteOne(query);
            console.log(result)
            res.send(result)
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