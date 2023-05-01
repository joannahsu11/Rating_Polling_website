const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomCharacters";

const mongoUrl = "mongodb+srv://justinhoang:EFyZWnu5bp1bjMAK@beachraters.mul8e.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
})
.then(() => {console.log("Connected to Database");
    })
.catch(e => console.log(e));

<<<<<<< Updated upstream:server/app.js
require("./userDetails")
=======
require("./dbDetails")

const PollData = mongoose.model("polling-polls");

const VoteData=mongoose.model("polling-votes");

app.get('/poll', async (req, res) => {
  try {
    const polls = await PollData.find(); // retrieve all users from MongoDB
    res.send(polls); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // handle errors
  }
});


app.post("/poll",async(req,res)=>{
    const {id,title, description, options,totalVotes,voted,useremail,voter} = req.body;
    
    try{
        await PollData.create({
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


app.post("/poll",async(req,res)=>{
    const {id,useremail} = req.body;
    
    try{
        await VoteData.create({
            poll_id: id,
            voter:useremail
        });
        res.send({status: "ok"});
    }
    catch(error){
        res.send({status: "error"});
    }
});
>>>>>>> Stashed changes:server/server.js


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


  
const User = mongoose.model("UserInfo");
app.post("/register",async(req,res)=>{
    const {firstName,lastName, email, password} = req.body;

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
            password: encryptedPassword,
        });
        res.send({status: "ok"});
    }
    catch(error){
        res.send({status: "error"});

    }
});

app.post("/login-user", async(req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
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
        const useremail = user.email;
        User.findOne({email:useremail})
        .then((data)=>{
            res.send({status:"ok", data: data})
        })
        .catch((error) => {
            res.send({status: "error", data: error});
        })
    }catch (error){

    }
});

app.listen(3000, ()=>{
    console.log("Server Stated");
})



