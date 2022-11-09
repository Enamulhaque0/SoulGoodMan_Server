const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vbwpfni.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const Services = client.db("SoulGodMan").collection("services");
    const Reviews =client.db("SoulGodMan").collection("reviews")

    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await Services.insertOne(service);
      res.send(result);
    });

app.post("/review",async(req,res)=>{
  
  const review =req.body
  const result = await Reviews.insertOne(review)
  res.send(result)




})

app.get("/review", async(req,res)=>{
 let query ={}

if(req.query.name){
  
 
  query={
    name: req.query.name


  }

}
 const cursor = Reviews.find(query)
 const review = await cursor.toArray()
 res.send(review)



})



    app.get("/services", async (req, res) => {
      const query = {};

      const cursor = Services.find(query);

      const services = await cursor.toArray();

      res.send(services);
    });



    app.get("/serviceDetails/:id", async (req, res) => {
      const { id } = req.params;
      
      const query = { _id: ObjectId(id) };
      const service = await Services.findOne(query);
      res.send(service);
    });




    app.get("/", async (req, res) => {
      const query = {};

      const cursor = Services.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
  } finally {
  }
}

run();

app.listen(port, () => {
  console.log(`Soul GoodMan on ${port}`);
});
