const {mongoose} = require('./../db/mongoose');
const {Mydocuments} = require('./../models/documentschema');

const User = require('./../models/userschema');
const loggercontroller = require('./loggercontroller');

exports.documentload = (req, res, next) => {
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
        return res.render('./../views/pages/documentu')
      }
    }
  });
}

exports.documentupload = (req, res) => {
  var myDocuments =  new Mydocuments({
    link: req.body.link,
    name: req.body.name,
    text: req.body.text,
  });
  //console.log(req.body.text);
  myDocuments.save().then((documents) =>{
  return  res.redirect('/documents');
  }, (e) => {
  return  res.status(400).send(e);
  })
}
exports.documentretreive =(req, res) => {
  Mydocuments.find().then((documents) => {
  return  res.render('pages/documentsret', {
      title: 'Documents',
      documents: documents
    } );
  }, (e) => {
  return  res.status(400).send(e);
  });
};
