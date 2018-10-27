const {mongoose} = require('./../db/mongoose');
const {Myvideos} = require('./../models/videoschema');

exports.videoupload = (req, res) => {
  var myvideos =  new Myvideos({
    link: req.body.link,
    name: req.body.name,
    text: req.body.text,
  });
  //console.log(req.body.text);
  myvideos.save().then((videos) =>{
  return  res.redirect('/videos');
  }, (e) => {
  return  res.status(400).send(e);
  })
};
exports.videoretreive =(req, res) => {
  Myvideos.find().then((videos) => {
  return  res.render('pages/videosret', {
      title: 'Videos',
      videos: videos
    } );
  }, (e) => {
  return  res.status(400).send(e);
  });
};
