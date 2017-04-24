var auth = require('../db');
var passport = require('passport');

module.exports = function(router,db){

	router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });



router.post('/checkuser', function(req, res, next) {
	console.log(req.body.username);
	db.collection('users').count({'username' :req.body.username}).then(function(count){
		if(count >= 1)
		{
			res.send("user already exists");
		}
		res.send("");
	});
});


router.get('/login',function(req, res) {
    res.redirect('/#/login');
  });

  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
   res.redirect('/index/#/chatbot');
  });
  
  
router.get('/logout',
  function(req, res){
	  req.session.destroy(function(err) { 
		console.log("done");
});
	db.close();
	auth.users.closedb();
    req.logout();
    res.redirect('/');
  });
  
router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send(JSON.stringify(req.user));
  });
  
router.get('/index',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   res.render('index');
  });
  

 }