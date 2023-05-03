const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email: {type: String, unique: true},
        id: {type: String, unique: true},
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


const voteDetailsSchema = new mongoose.Schema(
    {
        voter:{type: String},
        poll_id:{type: Number}
    },
    {
        collection: "votes_collection",
    }
);
mongoose.model("votes_collection", voteDetailsSchema);



const RatingDetailSchema = new mongoose.Schema(
    {
        rate_id:{type: Number},
        creater:{type: String},
        title:{type: String},
        enddate:{type:Date},
        description: {type: String},
        options: {type: Array},
        totalVotes:{type: Number},
        avgRating:{type: Number}
    },
    {
        collection: "rating_collection",
    }
);
mongoose.model("rating_collection", RatingDetailSchema);


const rateVoteDetailsSchema = new mongoose.Schema(
    {
        voter:{type: String},
        rate_id:{type: Number}
    },
    {
        collection: "rate_votes_collection",
    }
);
mongoose.model("rate_votes_collection", rateVoteDetailsSchema);


