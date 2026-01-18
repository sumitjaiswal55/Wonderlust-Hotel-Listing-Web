const User =  require("../models/users.js");


module.exports.renderSignupForm = (req, res)=>{
    res.render("./users/signup.ejs");
}

// SignUp
module.exports.signUp = async(req, res)=>{
    try{

    let {username, email, password} = req.body;
    const newUser = new User ({email, username});
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err)=>{
        if(err){
            return next(err);
        }
    req.flash("success", "user was registered");
    res.redirect("/listings");
    })
   }
   catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
   } 

   
}

// LogIn

module.exports.renderLoginForm = (req, res)=>{
    res.render("./users/login.ejs");
}

module.exports.logIn = async(req, res)=>{
    req.flash("success", "you are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}

// Logout
module.exports.logOut = (req, res, next)=>{
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "logged out");
        res.redirect("/listings");
    })
}