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

require("./userDetails")

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



