const {mongoose} = require('./../db/mongoose');
const {Myimages} = require('./../models/imgschema');

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

module.exports = {
  imageupload: imageupload,
  imageretreive: imageretreive,
}
