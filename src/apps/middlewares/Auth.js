const checkRole = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else {
    res.redirect("/admin/login");
  }
};
const checkLogin = (req, res, next) => {
  if (req.session.user && req.session.role === "admin") {
    res.redirect("/admin/dashboard");
  } else {
    next();
  }
};

module.exports = {
  checkRole,
  checkLogin,
};
