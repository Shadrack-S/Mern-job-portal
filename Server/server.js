const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT ||3000;

// MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(cookieParser())

// Database CONNECTION
const DbUrl=process.env.DB_URL
const DbPass=process.env.DB_PASSWORD
const UrlPass=DbUrl.replace("<password>",DbPass);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = UrlPass;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // createdb
    const db= client.db("JobPortal");
    const jobCollection= db.collection("dbJobs");
    const userCollection= db.collection("dbUser");

    // Verify user
    const verifyUser =(req,res,next)=>{
      const token =req.cookies.token;
      if(!token){
          return res.json("The Token Was not available")
      }else{
          jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
              if(err) return res.json("Token is incorrect")
                  next();
          })
      }
  }
    
// get all jobs
app.get('/all-jobs', async(req, res) => {
  const jobs =await jobCollection.find({}).toArray();
  res.json(jobs);
 })

//  get a job by id
app.get('/all-jobs/:id',async(req,res)=>{
  const id= req.params.id
 try{
  const jobs =await jobCollection.findOne({_id:new ObjectId(id)})
  res.status(200).json(jobs)
 }catch(error){
  res.status(404).send('Not Found');
 }

})

//  get jobs by emails
app.get('/myJobs/:email',async(req,res)=>{
  const jobs =await jobCollection.find({postedBy:req.params.email}).toArray();
  res.json(jobs)
})

 // post A job
 app.post('/post-job',async(req, res)=> {
   const body=req.body;
   body.createAt =new Date();
   console.log(body);
   const result= await jobCollection.insertOne(body);
   if(result.insertedId){
     return res.status(200).send(result);
   }else{
     return res.status(404).send({
       message:"cannot insert try again",
       status:false
     })
   }
 })
// Update Job
app.patch('/update-job/:id',async(req,res)=>{
  const id =req.params.id;
  const jobData= req.body;

  const filter = {_id:new ObjectId(id)};
  const options ={upsert :true};
  const updateDoc={
  $set:{
    ... jobData
  },
};
const result =await jobCollection.updateOne(filter, updateDoc,options);
res.status(200).json(result)
})

//  Delete a Jobs
 app.delete('/job/:id',async(req,res)=>{
  const id= req.params.id;
  const filter ={_id:new ObjectId(id)}
  const result =await jobCollection.deleteOne(filter);
  res.status(200).json(result)
 })

//  User

// Register user
app.post('/signup',async(req,res)=>{
  const{name,email,password} = req.body;
  console.log(req.body)
  bcrypt.hash(password,10)
  .then(hash=>{
      userCollection.insertOne({name, email, password: hash})
    .then(Users=>res.json(Users))
     .catch(err=>res.json(err))

  }).catch(err=>console.log(err.message))
})

// login

app.post('/login',async(req,res)=>{

  try{
    const {email,password} =req.body
    const user = await userCollection.findOne({email})
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})

        res.json({ message: 'Login successful', token, redirectTo: '/' });

  }catch{
    console.error(err);
        res.status(500).json({ message: 'Server error' });
  }
    
})
   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server is Running on Port : ${port}`)
})