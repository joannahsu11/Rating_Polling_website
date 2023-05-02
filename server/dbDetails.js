const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email: {type: String, unique: true},
        password:String,
        isLoggedIn:Boolean
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);


const PollingDetailsSchema = new mongoose.Schema(
    {
        poll_id:{type: Number},
        creater:{type: String},
        title:{type: String},
        enddate:{type:Date},
        description: {type: String},
        options: {type: Array},
        totalVotes:{type: Number}
    },
    {
        collection: "polling_collection",
    }
);

mongoose.model("polling_collection", PollingDetailsSchema);


const RatingSchema = new mongoose.Schema(
    {
        id: {type: Number},
        title:{type: String},
        description:{type: String},
        options: {type: Array},
        totalVotes:{ type: Number},
        voted:  { type: Boolean},
        useremail:{type: String},
        voter:{type: String},
    },
    {
        collection: "Rating"
    }
);

mongoose.model('Rating', RatingSchema);
