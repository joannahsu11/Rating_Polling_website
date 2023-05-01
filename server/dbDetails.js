const mongoose = require("mongoose");

const PollingSchema = new mongoose.Schema(
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
        collection: "polling",
    }
);



mongoose.model("polling-polls", PollingSchema);

const VotingSchema = new mongoose.Schema(
    {
        poll_id: {type: Number},
        voter:{type: String},
    },
    {
        collection: "vote",
    }
);

mongoose.model("polling-votes", VotingSchema);


const UserDetailsSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email: {type: String, unique: true},
        password:String
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);


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
