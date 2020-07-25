const db = require("../config/keys");
const adminCtrl = {};

adminCtrl.displayLogin = (req, res) => res.render("adminLogin");

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
          console.log(`"${username}" login succesfully!!!`);
          res.render("adminDashboard");
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
  /* console.log(user); */
  let sql = "INSERT INTO admin SET ?";
  if (password === password2) {
    db.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(`User "${user.username}" added succesfully!!!`);
    });
    res.render("adminLogin");
  } else {
    console.log("Password do not match!!!");
  }
};

adminCtrl.addPost = (req, res) => {
  const { title, author, content } = req.body;
  const postDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(postDate);
  const post = { title, author, content, date: postDate };
  console.log(post);
  let sql = "INSERT INTO post SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(`Post "${post.title}" added succesfully!!!`);
  });
  res.render("adminDashboard");
};

module.exports = adminCtrl;
