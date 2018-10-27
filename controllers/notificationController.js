const {mongoose} = require('./../db/mongoose');
const {Myevents} = require('./../models/eventschema');

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
}
