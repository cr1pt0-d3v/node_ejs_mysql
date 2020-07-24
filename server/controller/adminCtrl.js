const db = require("../config/keys");
const adminCtrl = {};

adminCtrl.displayLogin = (req, res) => res.render("admin");

adminCtrl.handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      let sql = "SELECT * FROM admin WHERE username=? AND password=?";
      await db.query(sql, [username, password], (err, user, fields) => {
        if (user.length) {
          req.session.loggedin = true;
          req.session.username = username;
          req.session.password = password;
          console.log(`${username} login succesfully!!!`);
          res.render("home");
        } else {
          console.log("Wrong username or password!");
        }
      });
    }
  } catch (error) {
    return next(error);
  }
};

adminCtrl.displayRegister = (req, res) => res.render("adminRegister");

adminCtrl.handleRegister = (req, res) => {
  const { username, email, password, password2 } = req.body;
  const user = { username, email, password };
  console.log(user);
  let sql = "INSERT INTO admin SET ?";
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

module.exports = adminCtrl;
