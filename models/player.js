var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
	person: String,
	image: String,
	contactInfo: String,
	wager: String,
<<<<<<< HEAD
=======
	author: {
	  id: {
	      type: mongoose.Schema.Types.ObjectId,
	      ref: "User"
	  },  
	  username: String
	},
>>>>>>> develop
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// Next line exports this file to app.js
module.exports = mongoose.model("Player", playerSchema);