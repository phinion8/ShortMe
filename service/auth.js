const jwt = require("jsonwebtoken");
const secret = "holaamigospriyanshu";

function setUser(user) {
      const userObj = {
            _id: user._id,
            email: user.email,
      }
      return jwt.sign(userObj, secret);
}
function getUser(token) {
      try {
            if (token == null) return null;
            return jwt.verify(token, secret);
      } catch {
            return null;
      }

}

module.exports = {
      setUser,
      getUser
}