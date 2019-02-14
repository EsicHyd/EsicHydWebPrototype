var { env } = require('./config/config');

var express = require('express');
var app = express();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

//controller routes
const { log } = require('./controllers/loggercontroller');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());




app.use(cors({ origin: true }));


function getIp(req) {
  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }
  return ip;
}

function rotcc13(str) {
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321';
  var index = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}


function errLog(err, req, res, next) {
  log(err.stack, getIp(req), req.method, req.route.path, 'error');
  var er = { msg: err.message, status: 500 };
  res.status(500).render('pages/err', er);
}


//===============================================================================
//===============================================================================

app.get('/', function (req, res) {
  var data = {
    link: process.env.API_URI
  }
  res.render("pages/index", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/about', function (req, res) {
  res.render("pages/about.ejs");
  log("", getIp(req), req.method, req.route.path);
});


// app.get('/blog', function (req, res) {

//   res.render("pages/blog.ejs");
//   log("", getIp(req), req.method, req.route.path);


// });
//===============================================================================
//===============================================================================
//images gallery


app.get('/gallery', function (req, res) {
  var queryTag = req.query.qtag;

  if (queryTag == null || queryTag == undefined || queryTag == "") {
    queryTag = 'all';
  }
  var data = {
    linkAPI: process.env.API_URI,
    pathtag: queryTag,
    typeData: 'img',
    page: 'Image Gallery - ESIC Hyderabad',
    imagepath: './img/header-background.jpg',
    tags: [
      "Public form", "Image Gallery"
    ]
  }
  res.render("pages/gallery-template", data);
  log("", getIp(req), req.method, req.route.path);
});
//===============================================================================
//===============================================================================
//documents
app.get('/doc', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'docTag',
    type: 'doc', contentTag: 'someTag',
    page: 'doc template - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "tag1", "tag2", "lastTag"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/RecruitAdv.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,

    pathtag: 'RecruitmentAdvertising',
    type: 'doc', contentTag: 'education',
    page: 'Advertising of Recruitment - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
>>>>>>> master
    tags: [
      "Education", "Advertising of Recruitment"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/RecruitRes.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'RecruitmentResult',
    type: 'doc', contentTag: 'education',
    page: 'Advertising of Recruitment - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Results of Recruitment"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/StudentResults.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,

    pathtag: 'StudentResults',
    type: 'doc', contentTag: 'education',
    page: 'Results - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
>>>>>>> master
    tags: [
      "Education", "Student Zone", "Results"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/Schedules.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'StudentSchedules',
    type: 'doc', contentTag: 'education',
    page: 'Schedules - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Student Zone", "Schedules"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/StudentZone_1YR.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'StudentZone_Y1',
    type: 'doc', contentTag: 'education',
    page: '1st Year - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Student Zone", "1st Year"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/StudentZone_2YR.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'StudentZone_Y2',
    type: 'doc', contentTag: 'education',
    page: '2st Year - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Student Zone", "2nd Year"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/StudentZone_3YR.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'StudentZone_Y3',
    type: 'doc', contentTag: 'education',
    page: '3rd Year - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Student Zone", "3rd Year"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/StudentZone_4YR.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'StudentZone_Y4',
    type: 'doc', contentTag: 'education',
    page: '4th Year - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Student Zone", "4th Year"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/PressMedia.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'PressMedia',
    type: 'doc', contentTag: 'about',
    page: 'Press Media - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "About", "Press Media"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/AnnualReport.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'AnnualReport',
    type: 'doc', contentTag: 'about',
    page: 'Annual Report - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "About", "Annual Report"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/University.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'University',
    type: 'doc', contentTag: 'about',
    page: 'University and Govt. Approval - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "About", "University and Govt. Approval"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Admission.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Admission',
    type: 'doc', contentTag: 'someTag',
    page: 'Admission - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Education", "Admission"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Courses.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Courses',
    type: 'doc', contentTag: 'someTag',
    page: 'Courses - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "tag1", "tag2", "Courses"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});







app.get('/Conference.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Conference',
    type: 'doc', contentTag: 'someTag',
    page: 'CME and Conference - ESIC Hyderabad',
    imagepath: './img/conf.jpg',
    tags: [
      "Education", "CME and Conference"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Training.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Training',
    type: 'doc', contentTag: 'someTag',
    page: 'Training - ESIC Hyderabad',
    imagepath: './img/training.jpg',
    tags: [
      "Education", "Training"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/JournalESI.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'JournalESI',
    type: 'doc', contentTag: 'someTag',
    page: 'Journal ESI - ESIC Hyderabad',
    imagepath: './img/journal.jpg',
    tags: [
      "Education", "Journal ESI"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Research.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Research',
    type: 'doc', contentTag: 'research',
    page: 'Research and Development - ESIC Hyderabad',
    imagepath: './img/rad.jpg',
    tags: [
      "Research","Research and Development"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});

app.get('/ResearchProg.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'OrganisedResearchProgram',
    type: 'doc', contentTag: 'research',
    page: 'Organised Research Program - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Research","Organised Research Program"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/CitizenCharter.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'CitizenCharter',
    type: 'doc', contentTag: 'public-forum',
    page: 'Citizen Charter - ESIC Hyderabad',
    imagepath: './img/ccr.jpg',
    tags: [
      "Public Forum", "Citizen Charter"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/BodyDonation.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'BodyDonation',
    type: 'doc', contentTag: 'public-forum',
    page: 'Body Donation - ESIC Hyderabad',
    imagepath: './img/bd.jpg',
    tags: [
      "Public Forum", "Body Donation"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/RulesRegulation.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'RulesRegulation',
    type: 'doc', contentTag: 'public-forum',
    page: 'Rules and Regulation - ESIC Hyderabad',
    imagepath: './img/rar.jpg',
    tags: [
      "Public Forum", "Rules and Regulation"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/BioWasteManagement.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'BioWasteManagement',
    type: 'doc', contentTag: 'public-forum',
    page: 'Bio Medical Waste Management - ESIC Hyderabad',
    imagepath: './img/admimg.jpg',
    tags: [
      "Public Forum", "Bio Medical Waste Management"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/RTI.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'RTI',
    type: 'doc', contentTag: 'public-forum',
    page: 'RTI - ESIC Hyderabad',
    imagepath: './img/page-background.jpg',
    tags: [
      "Public Forum", "RTI"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Administration.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Administrations',
    type: 'doc', contentTag: 'about',
    page: 'Administrations - ESIC Hyderabad',
    imagepath: './img/adminis.jpg',
    tags: [
      "About", "Administration"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Awards.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Awards',
    type: 'doc', contentTag: 'about',
    page: 'Awards and honors - ESIC Hyderabad',
    imagepath: './img/award.jpg',
    tags: [
      "About", "Awards and honors"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Infrastrutcure.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Infrastrutcure',
    type: 'doc', contentTag: 'about',
    page: 'Infrastrutcure - ESIC Hyderabad',
    imagepath: './img/infrastructure.jpg',
    tags: [
      "About", "Infrastrutcure"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Events.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Events',
    type: 'doc', contentTag: 'someTag',
    page: 'Upcoming Events - ESIC Hyderabad',
    imagepath: './img/ue.jpg',
    tags: [
      "Education", "Upcoming Events"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});




app.get('/Publication.docs', function (req, res) {
  var data = {
    link: process.env.API_URI,
    pathtag: 'Publication',
    type: 'doc', contentTag: 'research',
    page: 'Publication - ESIC Hyderabad',
    imagepath: './img/rad.jpg',
    tags: [
      "Research", "Publication"
    ]
  }
  res.render("pages/data-template", data);
  log("", getIp(req), req.method, req.route.path);
});



//===============================================================================
//===============================================================================

// app.get('/blogp', function (req, res) {

//   res.render("pages/blog-post.ejs");
//   log("", getIp(req), req.method, req.route.path);

// });

app.get('/contact', function (req, res) {
  res.render("pages/contact.ejs");
  log("", getIp(req), req.method, req.route.path);
});
app.get('/hospital', function (req, res) {
  res.render('pages/hospital.ejs');
  log("", getIp(req), req.method, req.route.path);
});
app.get('/education', function (req, res) {
  res.render('pages/education.ejs');
  log("", getIp(req), req.method, req.route.path);
});
app.get('/research', function (req, res) {
  res.render('pages/research.ejs');
  log("", getIp(req), req.method, req.route.path);
});
app.get('/faculty_attendance', function (req, res) {
  res.render('pages/faculty_attendance.ejs');
  log("", getIp(req), req.method, req.route.path);
});

app.get('/faculty', function (req, res) {
  res.render('pages/faculty.ejs');
  log("", getIp(req), req.method, req.route.path);
});
app.get('/course', function (req, res) {
  res.render('pages/course.ejs');
  log("", getIp(req), req.method, req.route.path);
});
app.get('/student_zone', function (req, res) {
  res.render('pages/student_zone.ejs');
  log("", getIp(req), req.method, req.route.path);
});
app.get('/listOfCandidate',function(req,res){
  res.render('pages/candidateList.ejs');
  log("", getIp(req), req.method, req.route.path);
});


//===============================================================================
//===============================================================================

//hospital services
app.get('/gs', function (req, res) {

  res.render('pages/services/gs.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/gm', function (req, res) {

  res.render('pages/services/gm.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/og', function (req, res) {

  res.render('pages/services/og.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/pml', function (req, res) {

  res.render('pages/services/pml.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/dmt', function (req, res) {

  res.render('pages/services/dmt.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/pdt', function (req, res) {

  res.render('pages/services/pdt.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/pct', function (req, res) {

  res.render('pages/services/pct.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/otp', function (req, res) {

  res.render('pages/services/otp.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/opl', function (req, res) {

  res.render('pages/services/opl.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/ent', function (req, res) {

  res.render('pages/services/ent.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/ats', function (req, res) {

  res.render('pages/services/ats.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/rdd', function (req, res) {

  res.render('pages/services/rdd.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/hmt', function (req, res) {

  res.render('pages/services/hmt.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/dtt', function (req, res) {

  res.render('pages/services/dtt.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/pst', function (req, res) {

  res.render('pages/services/pst.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/cbc', function (req, res) {

  res.render('pages/services/cbc.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/cpt', function (req, res) {

  res.render('pages/services/cpt.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/cmb', function (req, res) {

  res.render('pages/services/cmb.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/nulhs', function (req, res) {

  res.render('pages/services/nulhs.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/nus', function (req, res) {

  res.render('pages/services/nus.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/pds', function (req, res) {

  res.render('pages/services/pds.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/url', function (req, res) {

  res.render('pages/services/url.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/npl', function (req, res) {

  res.render('pages/services/npl.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/cdl', function (req, res) {

  res.render('pages/services/cdl.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/pls', function (req, res) {

  res.render('pages/services/pls.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/gel', function (req, res) {

  res.render('pages/services/gel.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/ctv', function (req, res) {

  res.render('pages/services/ctv.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/mol', function (req, res) {

  res.render('pages/services/mol.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/sol', function (req, res) {

  res.render('pages/services/sol.ejs');
  log("", getIp(req), req.method, req.route.path);

});
app.get('/enl', function (req, res) {

  res.render('pages/services/enl.ejs');
  log("", getIp(req), req.method, req.route.path);

});
//public forum
app.get('/publicforum', function (req, res) {
  res.render('pages/publicforum.ejs');
  log("", getIp(req), req.method, req.route.path);
})



//mailer service
app.post("/send", function (req, res) {
  var ap1 = "FT";
  var ap2 = "OBEsnUdNExXryjJybYuq4t";
  var ap3 = "r8SJp0fiib41Su5YeYdzSTc76pH0cqWoBPOStbVuM5N";
  var api = ap1 + "." + ap2 + "." + ap3;
  sgMail.setApiKey(rotcc13(api));

  if (req.method !== "POST") {
    res.send(405, "Invalid req")
  } else {
    const msg = {
      to: 'paritoshsrivastava9199@gmail.com',
      // cc: rotcc13(req.query.e),
      from: 'noreply@esichyd.org',
      subject: 'Message from ' + rotcc13(req.query.n) + ' regarding ' + rotcc13(req.query.s),
      html: `<html>
      <head>
      </head>
      <body>
          <p>Hello Admin</p>
          <p>You have a new message from a ${rotcc13(req.query.n)} regarding ${rotcc13(req.query.s)}.</p>
          <p>
              <em><strong>Name:</strong></em> ${rotcc13(req.query.n)}<br>
              <em><strong>Subject:</strong></em> ${rotcc13(req.query.s)}<br>
              <em><strong>Email:</strong></em> ${rotcc13(req.query.e)}<br>
              <strong><em>Message:</em></strong><br>
              ${req.query.m}
              <br>
              <p>To reply back to ${rotcc13(req.query.n)} please reply back to this email <a href="mailto:${rotcc13(req.query.e)}">${rotcc13(req.query.e)}</a></p>
              <p><em>This is an auto generated email.Please do not reply back to this email.</em></p>

          </p>
          <p>Thanks and Regards,<br>
              Your ESIC Team.</p>
      </body>
      </html>`
      // texdt: rotcc13(req.query.n) + " Email: " + rotcc13(req.query.e) + " Phone: " + rotcc13(req.query.p) + " Message: " + rotcc13(req.query.m),
      // html: "<strong>" + rotcc13(req.query.n) + "</strong><br>Email: " + rotcc13(req.query.e) + " <br>Phone: " + rotcc13(req.query.p) + " <br><h5>Message: </h5>" + rotcc13(req.query.m),
    };

    const msg_ack = {
      to: rotcc13(req.query.e),
      // cc: rotcc13(req.query.e),
      from: 'noreply@esichyd.org',
      subject: 'Noreply: Message from Esic regarding ' + rotcc13(req.query.s),
      html: `<html>
      <head>
      </head>
      <body>
          <p>Dear ${rotcc13(req.query.n)}</p>
          <p>Thank you for your message regarding ${rotcc13(req.query.s)}. Resolving your issues and answering questions are a top priority for us. A member of our support team will follow up with you today to resolve your inquiry.</p>
          <p><em>The entire ESIC team looks forward to a very professional working relationship with you, and we ready to
              support you in any way possible to serve you better.</em></p>
          <p>Thank you for contacting us! We value your feedback/suggestions/complaint. To give your valued opinion please use this <a href="#">link</a>.<br><em>This is an auto generated email.Please do not reply back to this email.</em></p>

          Thanks and Regards,<br>
          Your ESIC Team.
      </body>
      </html>`
    };
    try {
      var b = 0;
      sgMail.send(msg).then(function () {

        sgMail.send(msg_ack).then(function () {
          b = 1;
          res.send({ success: true });
          res.end();
          return { success: true };
          // res.send(rotcc13(req.query.n)+" Email: "+rotcc13(req.query.e)+" Phone: "+rotcc13(req.query.p)+" Message: "+rotcc13(req.query.m));
        }).catch(function (err) {
          b = 0;
          console.log(err);
          res.send({ success: false });
          res.end();
        });


        // b = 1;
        // res.send({ success: true });
        // res.end();
        // return { success: true };
        // res.send(rotcc13(req.query.n)+" Email: "+rotcc13(req.query.e)+" Phone: "+rotcc13(req.query.p)+" Message: "+rotcc13(req.query.m));
      }).catch(function (err) {
        b = 0;
        console.log(err);
        res.send({ success: false });
        res.end();
      });

    } catch (err) {
      // console.log(err);
      // res.send("mail not sent! Server err: "+err);
    }
    // res.send("yo!");
  }
});


app.get('*', function (req, res) {

  res.render("pages/404.ejs");
  log("", getIp(req), req.method, req.route.path);

});


app.use(errLog);
app.listen(app.get('port'), process.env.IP, function () {

  // const { address: ip } = lookup(os.hostname());
  // var networkAddress = `http://${os.networkInterfaces()}:${app.get('port')}`;
  // var networkAddress = `http://${os.hostname()}:${app.get('port')}`;
  log("Node Server running at port:" + app.get('port'));
  // log("hello error", "", "", "", 'error');

});
