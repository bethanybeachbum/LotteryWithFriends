// LOTTERY WITH FRIENDS

// FirstTwo lines are required for every EXPRESS JS app
var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	passport    		= require("passport"),
    LocalStrategy   	= require("passport-local"),
    User            	= require("./models/user"),
	Ticket 				= require("./models/ticket"),
	Player				= require("./models/player"),
	Comment				= require("./models/comment"),
	seedTicketDB		= require("./seedTickets"),
	seedPlayerDB		= require("./seedPlayers")

seedPlayerDB();
seedTicketDB();

// requiring routes
var playercommentRoutes = require("./routes/playercomments"),
	ticketcommentRoutes = require("./routes/ticketcomments"),
	playerRoutes		= require("./routes/players"),
	ticketRoutes		= require("./routes/tickets"),
	indexRoutes 		= require("./routes/index")

mongoose.connect("mongodb://localhost/lotteryDB");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Wilson wins the cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/players/:id/comments",playercommentRoutes); 
app.use("/tickets/:id/comments", ticketcommentRoutes);
app.use("/players", playerRoutes);
app.use("/tickets", ticketRoutes);

// ******************************************
// START Cloud9 SERVER for LOTTERY WITH FRIENDS
// ******************************************
  app.listen(process.env.PORT, process.env.IP, function(){
  console.log('LOTTERY FOR FRIENDS Server listening on port 3000');
});


// ******************************************
// START CODEANYWHERE SERVER
// ******************************************
//app.listen(process.env.PORT, function() {
//  console.log('LOTTERY FOR FRIENDS Server listening on port 3000');
//});


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