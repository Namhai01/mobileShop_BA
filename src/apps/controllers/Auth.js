const UserModel = require("../models/user");

const login = (req, res) => {
  res.render("admin/login", { data: {} });
};
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let error;
  const users = await UserModel.findOne({
    email: email,
    password: password,
  });
  if (req.body.email == "") {
    error = "Tài khoản không được để trống !";
  } else if (req.body.password == "") {
    error = "Mật khẩu không được để trống !";
  } else if (users) {
    req.session.user = users._id;
    req.session.role = users.role;
    res.redirect("/admin/dashboard");
    return; // Chuyển hướng ngay sau khi xử lý thành công
  } else {
    error = "Tài khoản không hợp lệ !";
  }
  res.render("admin/login", { data: { error: error } });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
};

module.exports = {
  login,
  postLogin,
  logout,
};
