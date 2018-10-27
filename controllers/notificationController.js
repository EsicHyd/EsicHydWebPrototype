const {mongoose} = require('./../db/mongoose');
const {Myevents} = require('./../models/eventschema');
const User = require('./../models/userschema');
const loggercontroller = require('./loggercontroller');

var eventload = (req, res, next) => {
  console.log(req.session.userid);
User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return res.redirect('/admin');
      } else {
        loggercontroller.logg("", getIp(request), request.method, request.route.path);
        return res.render('./../views/pages/eventsu')
      }
    }
  });
}

var eventupload = (req, res) => {
  var myevents =  new Myevents({
    link: req.body.link,
    name: req.body.name,
    text: req.body.text,
  });
  //console.log(req.body.text);
  myevents.save().then((events) =>{
    res.redirect('/events');
  }, (e) => {
    res.status(400).send(e);
  })
}
var eventretreive =(req, res) => {
  Myevents.find().then((events) => {
    res.render('pages/eventsret', {
      title: 'Images',
      events: events
    } );
  }, (e) => {
    res.status(400).send(e);
  });
}

module.exports = {
  eventupload : eventupload,
  eventretreive: eventretreive,
  eventload: eventload,
}
