var callback_url = (process.env.NODE_ENV === 'production') ? 'https://mssi-tps.herokuapp.com/auth/facebook/callback' : 'http://localhost:3000/auth/facebook/callback';

module.exports={
    "facebook_api_key" 		: 			(process.env.FACEBOOK_APP_ID || "1948822772018054"),
	"facebook_api_secret"	:			(process.env.FACEBOOK_SECRET || "aaffe0e8ef144242273a0a6988b99af0"),
	"callback_url"			:			callback_url,
	"bad_login_redirect"	:			"/",
	"good_login_redirect"	:			"/dashboard",
	"app_title"				:			"Road Behaviour Simulator",
	"use_database"			:			"true",
	"host"					:			"foxi.wuffhost.ovh",
	"port"					: "3306",
	"username"				:			"mssi_mssi",
	"password"				:			"mssi16",
	"database"				:			"mssi_mssi",
	"no_login_fallback"		:			"/"
}
