var config = require('./../configuration/config');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return true;
  }

  res.redirect(config.bad_login_redirect);
  return false;
}

module.exports={
    "ensureAuthenticated" : ensureAuthenticated
}
