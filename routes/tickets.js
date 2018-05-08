// Lottery With Friends -- TICKETS

var express = require("express");
var router = express.Router();
var Ticket = require("../models/ticket");

// INDEX - show all tickets 
router.get("/", function(req, res){
	// get all tickets from lotteryBD database
	Ticket.find({}, function (err, alltickets){
		if(err){
			console.log(err);
		} else {
			res.render("tickets/indextickets", {tickets:alltickets});
		}
	});
});


// CREATE - add new player to database -- matches line 145
// does logic of adding tickets
router.post("/", function(req, res){
	// get data from form
	var number = req.body.number;
	var image = req.body.image;
	var desc = req.body.description;	
	var newTicket = { number: number, image: image, description: desc }

	// Create a new campground and save to DB
    Ticket.create(newTicket, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/tickets");
        }
    });
});


//  NEW -- shows the form for new ticket - matches line 171
router.get("/newticket", function(req, res){
	// find the ticket with provided ID
	res.render("tickets/newticket");
});
	

// SHOW -- Shows more info about ticket -- matches line 198
router.get("/:id", function(req, res){
	// find the ticket with the provided ID
			Ticket.findById(req.params.id).populate("comments").exec(function(err, foundTicket){
					if(err) {
						console.log(err);
					} else {
						console.log(foundTicket);
						// render show template with that ticket
					 res.render ("tickets/showticket", {ticket: foundTicket});
					}
			});
});

module.exports = router;