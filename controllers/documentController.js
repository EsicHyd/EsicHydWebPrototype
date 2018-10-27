const {mongoose} = require('./../db/mongoose');
const {Mydocuments} = require('./../models/documentschema');

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
