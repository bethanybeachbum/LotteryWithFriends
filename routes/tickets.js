// Lottery With Friends -- TICKETS
// TICKET ROUTE from "routes" folder

var express = require("express");
var router = express.Router();
var Ticket = require("../models/ticket");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'henlopen-hackers', 
  api_key: 268875837274321, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


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


// CREATE - add new ticket to database -- matches line 145
// does logic of adding tickets
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
	cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.ticket.image = result.secure_url;
  // add author to campground
  req.body.ticket.author = {
    id: req.user._id,
    username: req.user.username
  }
  Ticket.create(req.body.ticket, function(err, ticket) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/tickets/' + ticket.id);
  });
});
});	
	
	
	
	// get data from form
// 	var number = req.body.number;
// 	var image = req.body.image;
// 	var desc = req.body.description;
// 	var author = {
// 		id: req.user._id,
// 		username: req.user.username
// 	}
// 	var newTicket = { 
// 		number: number, 
// 		image: image, 
// 		description: desc,
// 		author, author}
// 	console.log(req.user);
// 	// Create a new campground and save to DB
//     Ticket.create(newTicket, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             // console.log(newlyCreated);
//             res.redirect("/tickets");
//         }
//     });
// });


//  NEW -- shows the form for new ticket - matches line 171
router.get("/newticket", middleware.isLoggedIn, function(req, res){
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
router.get("/:id/edit", middleware.checkTicketOwnership, function (req, res){
	Ticket.findById(req.params.id, function(err,foundTicket){
		res.render("tickets/editticket", {ticket: foundTicket});
	});	
});


// UPDATE TICKET ROUTE
router.put("/:id", middleware.checkTicketOwnership, function(req, res){
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
router.delete("/:id", middleware.checkTicketOwnership, function(req, res){
	Ticket.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/tickets");
		} else {
			res.redirect("/tickets");
		}	
	});
});

module.exports = router;