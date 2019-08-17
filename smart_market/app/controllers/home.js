var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const constant = require('../../config/constants')

const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
  }

exports.loggedIn = function(req, res, next)
{
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

exports.home = function(req, res) {
	console.log(req.session.user.name)
	res.render('index.ejs', {
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,
		title: constant.project_name, 
		username: capitalize(req.session.user.name)
	 });
}


exports.signup = function(req, res) {
	if (req.session.user) {
		res.redirect('/home');
	} else {
		res.render('signup', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}

exports.login = function(req, res) {
	if (req.session.user) {
		res.redirect('/home');
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}


    
