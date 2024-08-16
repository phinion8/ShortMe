const User = require("../models/user");
const { setUser } = require("../service/auth");

async function signUpUser(req, res){
      const {name, email, password} = req.body;
      await User.create({
            name,
            email,
            password
      });
      return res.render("home");
}

async function loginUser(req, res){
      const {email, password} = req.body;
      const user = await User.findOne({email, password});
      if(!user) return res.render("login", {
            error: "Your email or password is incorrect."
      });
      const token = setUser(user);
      // res.cookie("uid", token);
      res.setHeader('Authorization', token);
      res.headers
      return res.json({
            token
      });
}

module.exports = {
      signUpUser,
      loginUser
}