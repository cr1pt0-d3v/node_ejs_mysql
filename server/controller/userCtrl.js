const db = require("../config/keys");
const userCtrl = {};

userCtrl.display = (req, res) => res.render("userDashboard");

// login GET
userCtrl.displayLogin = (req, res) => res.render("userLogin");
// login POST
userCtrl.handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      let sql = "SELECT * FROM users WHERE username=? AND password=?";
      await db.query(sql, [username, password], (err, user, fields) => {
        if (user.length) {
          req.session.loggedin = true;
          req.session.username = username;
          req.session.password = password;
          console.log(`${username} login succesfully!!!`);
          res.render("userDashboard");
        } else {
          console.log("Wrong username or password!");
        }
      });
    }
  } catch (error) {
    return next(error);
  }
};

// register GET
userCtrl.displayRegister = (req, res) => res.render("userRegister");
// handle register POST
userCtrl.handleRegister = (req, res) => {
  const { username, email, password, password2 } = req.body;
  const user = { username, email, password };
  console.log(user);
  let sql = "INSERT INTO users SET ?";
  if (password === password2) {
    db.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(`User ${user.username} added succesfully!!!`);
    });
    res.render("userLogin");
  } else {
    console.log("Password do not match!!!");
  }
};

module.exports = userCtrl;
