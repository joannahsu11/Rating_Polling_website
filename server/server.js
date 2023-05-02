const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomCharacters";

const mongoUrl = "mongodb+srv://joanna:9711@cecs443project.fbq50je.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
})
.then(() => {console.log("Connected to Database");
    })
.catch(e => console.log(e));

require("./dbDetails")

const User = mongoose.model("UserInfo");
app.post("/register",async(req,res)=>{
    const {firstName,lastName, id, email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password,10);
    try{
        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.send({error: "user exists"});
        }

        await User.create({
            firstName,
            lastName,
            email,
            id,
            password: encryptedPassword,
        });
        res.send({status: "ok"});
    }
    catch(error){
        res.send({status: "error"});

    }
});

app.post("/login-user", async(req,res) => {
    const {id, password} = req.body;  //was email

    const user = await User.findOne({id});  //was email
    if(!user){
        return res.send({error: "user not found"});
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({}, JWT_SECRET);

        if(res.status(201)){
            return res.json({status: "ok", data: token});
        }
        else{
            return res.json({error: "error"});
        }
    }
    res.json({status: "error", error: "Invalid Password"});
});

app.post("/userData", async (req, res) => {
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        const userID = user.id;
        User.findOne({id:userID})
        .then((data)=>{
            res.send({status:"ok", data: data})
        })
        .catch((error) => {
            res.send({status: "error", data: error});
        })
    }catch (error){

    }
});

const Poll = mongoose.model("polling_collection");

app.get('/poll', async (req, res) => {
  const today = new Date();
    try {
      const polls = await Poll.find({
        $or: [
          { enddate: { $gt: today } }, // date is later than today
          { totalVotes: { $gt: 50 } } // total vote count is greater than 50
        ]
      });
      res.send(polls); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error'); // handle errors
    }
  });

app.get('/mypoll', async (req, res) => {
    const creater = req.query.creater;
    const today = new Date();
    try {
      const polls = await Poll.find({ creater: { $regex: creater} }); 
      res.send(polls); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error'); // handle errors
    }
  });

app.get('/searchpoll', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const polls = await Poll.find({ title: { $regex: searchTerm, $options: 'i' } });
    console.log(polls);
    res.send(polls); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deletepoll', async (req, res) => {
  const poll_id = req.body.poll_id;
  try {
    const result = await Poll.deleteOne({ poll_id:poll_id });
    if (result.deletedCount === 1) {
      res.status(200).send('Poll deleted successfully.');
    } else {
      res.status(404).send('Poll not found.');
    }
  } catch (error) {
    res.send({status: "error"});
  }
});

app.post("/poll",async(req,res)=>{
    
    try{
        Poll.create(req.body);
        res.send({status: "ok"});
    }
    catch(error){
        res.send({status: "error"});

    }
});

app.post("/update-poll",async(req,res)=>{
    const updatedPoll = req.body;

  // Find the Poll document to update
  Poll.findOneAndUpdate({ poll_id: updatedPoll.poll_id }, updatedPoll, { new: true })
    .then((poll) => {
      if (!updatedPoll) {
        return res.status(404).json({ error: 'Poll not found' });
      }
      return res.json(poll);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
});



const Vote = mongoose.model("votes_collection");

app.post("/votepoll",async(req,res)=>{
    try{
        Vote.create(req.body);
        res.send({status: "votes added-success"});
    }
    catch(error){
        res.send({status: "votes added-failed"});

    }
});



const Rate = mongoose.model("Rating")
app.get('/rate', async (req, res) => {
    try {
      const ratings = await Rate.find(); // retrieve all users from MongoDB
      res.send(ratings); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error'); // handle errors
    }
  });
  
  app.post("/rate",async(req,res)=>{
      const {id,title, description, options,totalVotes,voted,useremail,voter} = req.body;
      
      try{
          await Rate.create({
            id: id,
            title: title,
            description: description,
            options: options,
            totalVotes: totalVotes,
            voted: voted,
            useremail:useremail,
            voter:voter
          });
          res.send({status: "ok"});
      }
      catch(error){
          res.send({status: "error"});
      }
  });

app.listen(5000, ()=>{
    console.log("Server Stated");
})


