var config = require('./../configuration/config');

function ensureAuthenticated(req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (req.isAuthenticated()) {
    return true;
  }

  res.redirect(config.bad_login_redirect);
  return false;
}

module.exports = {
    "ensureAuthenticated" : ensureAuthenticated
}
