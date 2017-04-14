var config = require('./../configuration/config');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return true;
  }

  res.redirect(config.no_login_fallback);
  return false;
}

module.exports={
    "ensureAuthenticated" : ensureAuthenticated
}
