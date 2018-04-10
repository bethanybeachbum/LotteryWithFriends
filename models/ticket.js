var mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema({
	
	number: String,
	image: String,
	description: String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// Next line exports this file to app.js
module.exports = mongoose.model("Ticket", ticketSchema);

