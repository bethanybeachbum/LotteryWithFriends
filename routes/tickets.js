// Lottery With Friends -- TICKETS
// TICKET ROUTE from "routes" folder

var express = require("express");
var router = express.Router();
var Ticket = require("../models/ticket");
// var middleware = require("../middleware");

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
router.post("/", isLoggedIn, function(req, res){
	// get data from form
	var number = req.body.number;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newTicket = { 
		number: number, 
		image: image, 
		description: desc,
		author, author}
	console.log(req.user);
	// Create a new campground and save to DB
    Ticket.create(newTicket, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            // console.log(newlyCreated);
            res.redirect("/tickets");
        }
    });
});


//  NEW -- shows the form for new ticket - matches line 171
router.get("/newticket", isLoggedIn, function(req, res){
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

// EDIT TICKET ROUTE
router.get("/:id/edit", checkTicketOwnership, function (req, res){
	Ticket.findById(req.params.id, function(err,foundTicket){
		res.render("tickets/editticket", {ticket: foundTicket});
	});	
});


// UPDATE TICKET ROUTE
router.put("/:id", checkTicketOwnership, function(req, res){
	//find and update the correct ticket
	Ticket.findByIdAndUpdate(req.params.id, req.body.ticket, function(err, updateTicket){
		if(err){
			res.redirect("/tickets");
		} else {
			res.redirect("/tickets/" + req.params.id);
		}
	});
	// then redirect somewhere on show page
});

//DESTROY TICKET ROUTE
router.delete("/:id", checkTicketOwnership, function(req, res){
	Ticket.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/tickets");
		} else {
			res.redirect("/tickets");
		}	
	});
});

//Check Ticket Ownership
function checkTicketOwnership(req, res, next) {
	if(req.isAuthenticated()){
			
		Ticket.findById(req.params.id, function(err,foundTicket){
			if(err) {
				res.redirect("back");
			} else {
				// does user own the ticket?
				if(foundTicket.author.id.equals(req.user._id)) {
				next();
			} else {
				res.redirect();	
			}
			}
		});	
	} else {
	res.redirect("back");
	}	
		
}

// function to insure user is logged in
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;