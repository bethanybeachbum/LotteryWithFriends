// LOTTERY WITH FRIENDS

// FirstTwo lines are required for every EXPRESS JS ap
var express 			= require("express"),
		app 					= express(),
		bodyParser 		= require("body-parser"),
		mongoose 			= require("mongoose"),
		Ticket 				= require("./models/ticket"),
		Player				= require("./models/player"),
		Comment				= require("./models/comment"),
		seedTicketDB	= require("./seedTickets"),
		seedPlayerDB	= require("./seedPlayers")

seedPlayerDB();
seedTicketDB();

mongoose.connect("mongodb://localhost/lotteryDB");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ******************************************
// this is the creation of the landing page
console.log("Landing Page Created -- slash");
app.get("/", function(req,res){
	res.render("landing");
});

// ******************************************
// ******************************************
// TICKETS
// ******************************************
// ******************************************
// INDEX - show all tickets -- matches line 133
// shows us all of the tickets
console.log("INDEX TICKETS Route Initiated -- slash tickets & app GET");
// ******************************************
app.get("/tickets", function(req, res){
	// get all tickets from lotteryBD database
	Ticket.find({}, function (err, alltickets){
		if(err){
			console.log(err);
		} else {
			res.render("tickets/indextickets", {tickets:alltickets});
		}
	});
});

// ******************************************
// CREATE - add new player to database -- matches line 145
// does logic of adding tickets
console.log("CREATE TICKETS Route Initiated -- slash tickets & app POST");
// ******************************************
app.post("/tickets", function(req, res){
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

// ******************************************
//  NEW -- shows the form for new ticket - matches line 171
console.log("SHOW FORM Page For Tickets -- slash ticketss slash newticket");
// ******************************************
app.get("/tickets/newticket", function(req, res){
	// find the ticket with provided ID
	res.render("tickets/newticket");
});
	
// ******************************************
// SHOW -- Shows more info about ticket -- matches line 198
console.log("SHOW TICKETS Route Initiated -- / tickets / :id");
// ******************************************
app.get("/tickets/:id", function(req, res){
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

// ******************************************
// COMMENTS ROUTE
// ******************************************
								app.get ("/tickets/:id/ticketcomments/new", function(req, res){
									// find ticket by ID 
									Ticket.findById(req.params.id, function(err, ticket){
										if(err){
											console.log(err);
										} else {
											res.render("ticketcomments/new", {ticket: ticket})
										}
									});
								});

// The data that gets posted is coming from a form in the view, it gets parsed by body-parser
// and added to the req.body object where it can be accessed in the POST route.

			app.post("/tickets/:id/ticketcomments", function(req, res){
				// lookup campground using ID
				Ticket.findById(req.params.id, function(err, ticket){
					if(err) {
						console.log(err);
						res.redirect("/tickets");
					} else {
						Comment.create(req.body.comment, function(err,comment){
							if(err){
							 console.log(err);
							 } else {
								ticket.comments.push(ticketcomment);	
								ticket.save();
								res.redirect('/tickets/' + ticket._id);
							 }
						});
					}
				});
});	
// 	create new comment
// 	connect new comment to campground
// 	redirect to campground show page


// ******************************************
// ******************************************
// PLAYERS
// ******************************************
// ******************************************


// ******************************************
// INDEX -- show all players -- matches line 76
console.log("INDEX PLAYERS Route Initiated --  slash players & APP GET");
// ******************************************
app.get("/players", function(req, res){
	// get all tickets from lotteryBD database
	Player.find({}, function (err, allPlayers){
		if(err){
			console.log(err);
		} else {
			res.render("players/indexplayers", {players: allPlayers});
		}
	});
});

// ******************************************
// CREATE - add new player to database -- matches line 82
console.log("CREATE PLAYER Route Initiated -- slash players & APP POST");
	// ******************************************
app.post("/players", function(req, res){
	// get data from form
	var person = req.body.person;
	var image = req.body.image;
	var contactInfo = req.body.contactInfo;
	var wager = req.body.wager;
	
	var newPlayer = {
		person: person, 
		image: image,
		contactInfo: contactInfo,
		wager: wager
	}
	
	// create a new player and add to players database -- matches line 101
	
Player.create(newPlayer, function(err, newlyCreated){
		if(err){
			console.log(err);
		}	else {
			res.redirect("/players");
		}
	});
	// players.push(newPlayer);
	// redirect back to campgrounds
});

// ******************************************	
// NEW form to create new player -- matches line 111
console.log("SHOW FORM Page For Player -- slash players slash newplayer");
// ******************************************

app.get("/players/newplayer", function(req, res){
	res.render("players/newplayer.ejs");
});

// ******************************************
// SHOW -- Shows more info about player - matches line 120
console.log("SHOW ROUTE For Detail Information on a Player -- /players/:id");
// ******************************************

app.get("/players/:id", function(req, res){
	// find the ticket with the provided ID
			Player.findById(req.params.id).populate("comments").exec(function(err, foundPlayer){
					if(err) {
						console.log(err);
					} else {
						console.log(foundPlayer);
						
						// render show template with that ticket
					 res.render ("players/showplayer", {player: foundPlayer});
					}
			});
});

// ******************************************
// COMMENTS ROUTE
// ******************************************

app.get ("/players/:id/comments/new", function(req, res){
	// find ticket by ID 
	Player.findById(req.params.id, function(err, player){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {player: player})
		}
	});
});

// The data that gets posted is coming from a form in the view, it gets parsed by body-parser
// and added to the req.body object where it can be accessed in the POST route.

app.post("/players/:id/comments", function(req, res){
	// lookup campground using ID
	Ticket.findById(req.params.id, function(err, player){
		if(err) {
			console.log(err);
			res.redirect("/players");
		} else {
			// req.body.comment has both pieces of comment info
			Comment.create(req.body.comment, function(err,comment){
				if(err){
				 console.log(err);
				 } else {
					player.comments.push(comment);	
					player.save();
					res.redirect('/players/' + player._id);
				 }
			});
		}
	});
	
	//create new comment
	//connect new comment to campground
	//redirect to campground show page
});


// ******************************************
// START CODEANYWHERE SERVER
// ******************************************
app.listen(3000, function() {
  console.log('LOTTERY FOR FRIENDS Server listening on port 3000');
});


// 	// create a new ticket and save to DB - matches line 159
// app.get("/tickets", function(req, res){
// 	// get all tickets from lotteryBD database
// 	Ticket.find({}, function (err, allTickets){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render("indextickets", {tickets:allTickets});
// 		}
// 	});
// });

// Player.create(
// 	{
// 	person: "Jack Johnson",
// 	image: "https://s.hdnux.com/photos/67/17/51/14481985/3/920x920.jpg",
// 	contactInfo: "jackj@hotmail.com",
// 	wager: 10
// 	}, 
// 	function(err, player) {
// 		if(err) {
// 			 console.log(err);
// 	} else {
// 	console.log ("NEWLY CREATED PLAYER");
// 	console.log(player);
// 	}
// 	});

// Ticket.create( 
// 	{
// 	number: "12 34 56 78 90",
// 	image: "https://www.ctlottery.org/Modules/Scratch/user-files/tickets-ro/1304.jpg",
// 	description: "powerball"
// 	}, 
// 	function(err, ticket) {
// 		if(err) {
// 			 console.log(err);
// 	} else {
// 	console.log ("NEWLY CREATED TICKET");
// 	console.log(ticket);
// 	}
// 	});
// **************