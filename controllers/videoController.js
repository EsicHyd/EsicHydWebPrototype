const {mongoose} = require('./../db/mongoose');
const {Myvideos} = require('./../models/videoschema');
const User = require('./../models/userschema');
const loggercontroller = require('./loggercontroller');

exports.videoload = (req, res, next) => {
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
        loggercontroller.logg("", loggercontroller.getIp(req), req.method, req.route.path);
        return res.render('./../views/pages/videosu')
      }
    }
  });
}

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
