// LOTTERY WITH FRIENDS

// FirstTwo lines are required for every EXPRESS JS ap
var express 			= require("express"),
		app 					= express(),
		bodyParser 		= require("body-parser"),
		mongoose 			= require("mongoose"),
		Ticket 				= require("./models/ticket"),
		Player				= require("./models/player"),
		seedTicketDB	= require("./seedTickets"),
		seedPlayerDB	= require("./seedPlayers")

seedPlayerDB();
seedTicketDB();

mongoose.connect("mongodb://localhost/lotteryDB");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");





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
// **********************************


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// this is the creation of the landing page
app.get("/", function(req,res){
	res.render("landing");
});

// ******************************************
// TICKETS
// ******************************************
// INDEX - show all tickets -- matches line 133
// shows us all of the tickets
app.get("/tickets", function(req, res){
	// get all tickets from lotteryBD database
	Ticket.find({}, function (err, alltickets){
		if(err){
			console.log(err);
		} else {
			res.render("indextickets", {tickets:alltickets});
		}
	});
});

// CREATE - add new player to database -- matches line 145
// does logic of adding tickets
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
	
	//  NEW -- shows the form for new ticket - matches line 171
app.get("/tickets/newticket", function(req, res){
	// find the ticket with provided ID
	res.render("newticket.ejs");
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
	


// SHOW -- Shows more info about ticket -- matches line 176
app.get("/tickets/:id", function(req, res){
	// find the ticket with the provided ID
			Ticket.findById(req.params.id, function(err, foundTicket){
					if(err) {
						console.log(err);
					} else {
						// render show template with that ticket
					 res.render ("showticket", {ticket: foundTicket});
					}
			});
});

// ******************************************
// PLAYERS
// ******************************************
// INDEX -- show all players -- matches line 76
app.get("/players", function(req, res){
	// get all tickets from lotteryBD database
	Player.find({}, function (err, allPlayers){
		if(err){
			console.log(err);
		} else {
			res.render("indexplayers", {players: allPlayers});
		}
	});
});

// CREATE - add new player to database -- matches line 89
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
	
// NEW form to create new player -- matches line 111
app.get("/players/newplayer", function(req, res){
	res.render("newplayer.ejs");
});

// SHOW -- Shows more info about player - matches line 117
app.get("/players/:id", function(req, res){
	// find the ticket with the provided ID
			Player.findById(req.params.id, function(err, foundPlayer){
					if(err) {
						console.log(err);
					} else {
						// render show template with that ticket
					 res.render ("showplayer", {player: foundPlayer});
					}
			});
});

// ******************************************
// START CODEANYWHERE SERVER
// ******************************************
app.listen(3000, function() {
  console.log('LOTTERY FOR FRIENDS Server listening on port 3000');
});