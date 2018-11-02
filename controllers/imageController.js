const {mongoose} = require('./../db/mongoose');
const {Myimages} = require('./../models/imgschema');
const User = require('./../models/userschema');
const loggercontroller = require('./loggercontroller');

var imageupload= (req, res) => {
  var myimages =  new Myimages({
    link: req.body.link,
    name: req.body.name,
    text: req.body.text,
  });

  //console.log(req.body.text);
  myimages.save().then((images) =>{
  return  res.redirect('/images');
  }, (e) => {
  return  res.status(400).send(e);
  })
};

var imageretreive = (req, res) => {
  Myimages.find().then((images) => {
  return  res.render('pages/imagesret', {
      title: 'Images',
      images: images
    } );
  }, (e) => {
  return  res.status(400).send(e);
  })
};

var imageload = (req, res, next) => {
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
        //loggercontroller.logg("", loggercontroller.getIp(req), req.method, req.route.path);
        return res.render('./../views/pages/imagesu')
      }
    }
  });
}
module.exports = {
  imageupload: imageupload,
  imageretreive: imageretreive,
  imageload: imageload,
}
