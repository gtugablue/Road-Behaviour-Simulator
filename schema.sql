DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Scene;
DROP TABLE IF EXISTS Quiz;
DROP TABLE IF EXISTS Decision;
DROP TABLE IF EXISTS Answer;

CREATE TABLE Users (
  idUser BIGINT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE Question (
	idQuestion INTEGER PRIMARY KEY AUTO_INCREMENT,
	statement TEXT NOT NULL,
  scene INTEGER REFERENCES Scene(idScene)
);

CREATE TABLE Scene (
	idScene INTEGER PRIMARY KEY AUTO_INCREMENT,
  quiz INTEGER REFERENCES Quiz(idQuiz),
  questionStatement TEXT NOT NULL,
	lat DOUBLE NOT NULL,
	lon DOUBLE NOT NULL,
  heading DOUBLE,
  pitch DOUBLE,
  zoom DOUBLE,
  correctDecision BOOLEAN,
  signs TEXT NOT NULL
);

CREATE TABLE Quiz (
	idQuiz INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
	idUser BIGINT REFERENCES Users(idUser),
  state INTEGER DEFAULT 0,
  CONSTRAINT State_Ck CHECK (state BETWEEN 0 AND 2)
);

CREATE TABLE Decision (
  idDecision INTEGER PRIMARY KEY AUTO_INCREMENT,
  idUser BIGINT REFERENCES Users(idUser),
  idScene INTEGER REFERENCES Scene(idScene),
  decision BOOLEAN,
  decisionTime LONG
);

CREATE TABLE Answer (
  idAnswer INTEGER PRIMARY KEY AUTO_INCREMENT,
  idUser BIGINT REFERENCES Users(idUser),
  idQuestion INTEGER REFERENCES Question(idQuestion),
  answer BOOLEAN
);

CREATE TABLE Countries (
  idCountry int(11) NOT NULL AUTO_INCREMENT,
  countryCode varchar(2) NOT NULL DEFAULT '',
  countryName varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (idCountry)
);

CREATE TABLE EducationLevels (
  idLevel int(11) NOT NULL AUTO_INCREMENT,
  description varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (idLevel)
);

CREATE TABLE UsersDemographics (
  idUser BIGINT PRIMARY KEY REFERENCES Users(idUser),
  birthDate DATE NOT NULL,
  hasDriversLicense BOOLEAN NOT NULL,
  drivingExperienceYears INTEGER,
  gender INTEGER NOT NULL,
  country INTEGER REFERENCES Countries(idCountry)
);

-- 
-- Dumping data for table Countries
-- 
INSERT INTO Countries VALUES (null, 'AF', 'Afghanistan');
INSERT INTO Countries VALUES (null, 'AL', 'Albania');
INSERT INTO Countries VALUES (null, 'DZ', 'Algeria');
INSERT INTO Countries VALUES (null, 'DS', 'American Samoa');
INSERT INTO Countries VALUES (null, 'AD', 'Andorra');
INSERT INTO Countries VALUES (null, 'AO', 'Angola');
INSERT INTO Countries VALUES (null, 'AI', 'Anguilla');
INSERT INTO Countries VALUES (null, 'AQ', 'Antarctica');
INSERT INTO Countries VALUES (null, 'AG', 'Antigua and Barbuda');
INSERT INTO Countries VALUES (null, 'AR', 'Argentina');
INSERT INTO Countries VALUES (null, 'AM', 'Armenia');
INSERT INTO Countries VALUES (null, 'AW', 'Aruba');
INSERT INTO Countries VALUES (null, 'AU', 'Australia');
INSERT INTO Countries VALUES (null, 'AT', 'Austria');
INSERT INTO Countries VALUES (null, 'AZ', 'Azerbaijan');
INSERT INTO Countries VALUES (null, 'BS', 'Bahamas');
INSERT INTO Countries VALUES (null, 'BH', 'Bahrain');
INSERT INTO Countries VALUES (null, 'BD', 'Bangladesh');
INSERT INTO Countries VALUES (null, 'BB', 'Barbados');
INSERT INTO Countries VALUES (null, 'BY', 'Belarus');
INSERT INTO Countries VALUES (null, 'BE', 'Belgium');
INSERT INTO Countries VALUES (null, 'BZ', 'Belize');
INSERT INTO Countries VALUES (null, 'BJ', 'Benin');
INSERT INTO Countries VALUES (null, 'BM', 'Bermuda');
INSERT INTO Countries VALUES (null, 'BT', 'Bhutan');
INSERT INTO Countries VALUES (null, 'BO', 'Bolivia');
INSERT INTO Countries VALUES (null, 'BA', 'Bosnia and Herzegovina');
INSERT INTO Countries VALUES (null, 'BW', 'Botswana');
INSERT INTO Countries VALUES (null, 'BV', 'Bouvet Island');
INSERT INTO Countries VALUES (null, 'BR', 'Brazil');
INSERT INTO Countries VALUES (null, 'IO', 'British Indian Ocean Territory');
INSERT INTO Countries VALUES (null, 'BN', 'Brunei Darussalam');
INSERT INTO Countries VALUES (null, 'BG', 'Bulgaria');
INSERT INTO Countries VALUES (null, 'BF', 'Burkina Faso');
INSERT INTO Countries VALUES (null, 'BI', 'Burundi');
INSERT INTO Countries VALUES (null, 'KH', 'Cambodia');
INSERT INTO Countries VALUES (null, 'CM', 'Cameroon');
INSERT INTO Countries VALUES (null, 'CA', 'Canada');
INSERT INTO Countries VALUES (null, 'CV', 'Cape Verde');
INSERT INTO Countries VALUES (null, 'KY', 'Cayman Islands');
INSERT INTO Countries VALUES (null, 'CF', 'Central African Republic');
INSERT INTO Countries VALUES (null, 'TD', 'Chad');
INSERT INTO Countries VALUES (null, 'CL', 'Chile');
INSERT INTO Countries VALUES (null, 'CN', 'China');
INSERT INTO Countries VALUES (null, 'CX', 'Christmas Island');
INSERT INTO Countries VALUES (null, 'CC', 'Cocos (Keeling) Islands');
INSERT INTO Countries VALUES (null, 'CO', 'Colombia');
INSERT INTO Countries VALUES (null, 'KM', 'Comoros');
INSERT INTO Countries VALUES (null, 'CG', 'Congo');
INSERT INTO Countries VALUES (null, 'CK', 'Cook Islands');
INSERT INTO Countries VALUES (null, 'CR', 'Costa Rica');
INSERT INTO Countries VALUES (null, 'HR', 'Croatia (Hrvatska)');
INSERT INTO Countries VALUES (null, 'CU', 'Cuba');
INSERT INTO Countries VALUES (null, 'CY', 'Cyprus');
INSERT INTO Countries VALUES (null, 'CZ', 'Czech Republic');
INSERT INTO Countries VALUES (null, 'DK', 'Denmark');
INSERT INTO Countries VALUES (null, 'DJ', 'Djibouti');
INSERT INTO Countries VALUES (null, 'DM', 'Dominica');
INSERT INTO Countries VALUES (null, 'DO', 'Dominican Republic');
INSERT INTO Countries VALUES (null, 'TP', 'East Timor');
INSERT INTO Countries VALUES (null, 'EC', 'Ecuador');
INSERT INTO Countries VALUES (null, 'EG', 'Egypt');
INSERT INTO Countries VALUES (null, 'SV', 'El Salvador');
INSERT INTO Countries VALUES (null, 'GQ', 'Equatorial Guinea');
INSERT INTO Countries VALUES (null, 'ER', 'Eritrea');
INSERT INTO Countries VALUES (null, 'EE', 'Estonia');
INSERT INTO Countries VALUES (null, 'ET', 'Ethiopia');
INSERT INTO Countries VALUES (null, 'FK', 'Falkland Islands (Malvinas)');
INSERT INTO Countries VALUES (null, 'FO', 'Faroe Islands');
INSERT INTO Countries VALUES (null, 'FJ', 'Fiji');
INSERT INTO Countries VALUES (null, 'FI', 'Finland');
INSERT INTO Countries VALUES (null, 'FR', 'France');
INSERT INTO Countries VALUES (null, 'FX', 'France, Metropolitan');
INSERT INTO Countries VALUES (null, 'GF', 'French Guiana');
INSERT INTO Countries VALUES (null, 'PF', 'French Polynesia');
INSERT INTO Countries VALUES (null, 'TF', 'French Southern Territories');
INSERT INTO Countries VALUES (null, 'GA', 'Gabon');
INSERT INTO Countries VALUES (null, 'GM', 'Gambia');
INSERT INTO Countries VALUES (null, 'GE', 'Georgia');
INSERT INTO Countries VALUES (null, 'DE', 'Germany');
INSERT INTO Countries VALUES (null, 'GH', 'Ghana');
INSERT INTO Countries VALUES (null, 'GI', 'Gibraltar');
INSERT INTO Countries VALUES (null, 'GK', 'Guernsey');
INSERT INTO Countries VALUES (null, 'GR', 'Greece');
INSERT INTO Countries VALUES (null, 'GL', 'Greenland');
INSERT INTO Countries VALUES (null, 'GD', 'Grenada');
INSERT INTO Countries VALUES (null, 'GP', 'Guadeloupe');
INSERT INTO Countries VALUES (null, 'GU', 'Guam');
INSERT INTO Countries VALUES (null, 'GT', 'Guatemala');
INSERT INTO Countries VALUES (null, 'GN', 'Guinea');
INSERT INTO Countries VALUES (null, 'GW', 'Guinea-Bissau');
INSERT INTO Countries VALUES (null, 'GY', 'Guyana');
INSERT INTO Countries VALUES (null, 'HT', 'Haiti');
INSERT INTO Countries VALUES (null, 'HM', 'Heard and Mc Donald Islands');
INSERT INTO Countries VALUES (null, 'HN', 'Honduras');
INSERT INTO Countries VALUES (null, 'HK', 'Hong Kong');
INSERT INTO Countries VALUES (null, 'HU', 'Hungary');
INSERT INTO Countries VALUES (null, 'IS', 'Iceland');
INSERT INTO Countries VALUES (null, 'IN', 'India');
INSERT INTO Countries VALUES (null, 'IM', 'Isle of Man');
INSERT INTO Countries VALUES (null, 'ID', 'Indonesia');
INSERT INTO Countries VALUES (null, 'IR', 'Iran (Islamic Republic of)');
INSERT INTO Countries VALUES (null, 'IQ', 'Iraq');
INSERT INTO Countries VALUES (null, 'IE', 'Ireland');
INSERT INTO Countries VALUES (null, 'IL', 'Israel');
INSERT INTO Countries VALUES (null, 'IT', 'Italy');
INSERT INTO Countries VALUES (null, 'CI', 'Ivory Coast');
INSERT INTO Countries VALUES (null, 'JE', 'Jersey');
INSERT INTO Countries VALUES (null, 'JM', 'Jamaica');
INSERT INTO Countries VALUES (null, 'JP', 'Japan');
INSERT INTO Countries VALUES (null, 'JO', 'Jordan');
INSERT INTO Countries VALUES (null, 'KZ', 'Kazakhstan');
INSERT INTO Countries VALUES (null, 'KE', 'Kenya');
INSERT INTO Countries VALUES (null, 'KI', 'Kiribati');
INSERT INTO Countries VALUES (null, 'KP', 'Korea, Democratic People''s Republic of');
INSERT INTO Countries VALUES (null, 'KR', 'Korea, Republic of');
INSERT INTO Countries VALUES (null, 'XK', 'Kosovo');
INSERT INTO Countries VALUES (null, 'KW', 'Kuwait');
INSERT INTO Countries VALUES (null, 'KG', 'Kyrgyzstan');
INSERT INTO Countries VALUES (null, 'LA', 'Lao People''s Democratic Republic');
INSERT INTO Countries VALUES (null, 'LV', 'Latvia');
INSERT INTO Countries VALUES (null, 'LB', 'Lebanon');
INSERT INTO Countries VALUES (null, 'LS', 'Lesotho');
INSERT INTO Countries VALUES (null, 'LR', 'Liberia');
INSERT INTO Countries VALUES (null, 'LY', 'Libyan Arab Jamahiriya');
INSERT INTO Countries VALUES (null, 'LI', 'Liechtenstein');
INSERT INTO Countries VALUES (null, 'LT', 'Lithuania');
INSERT INTO Countries VALUES (null, 'LU', 'Luxembourg');
INSERT INTO Countries VALUES (null, 'MO', 'Macau');
INSERT INTO Countries VALUES (null, 'MK', 'Macedonia');
INSERT INTO Countries VALUES (null, 'MG', 'Madagascar');
INSERT INTO Countries VALUES (null, 'MW', 'Malawi');
INSERT INTO Countries VALUES (null, 'MY', 'Malaysia');
INSERT INTO Countries VALUES (null, 'MV', 'Maldives');
INSERT INTO Countries VALUES (null, 'ML', 'Mali');
INSERT INTO Countries VALUES (null, 'MT', 'Malta');
INSERT INTO Countries VALUES (null, 'MH', 'Marshall Islands');
INSERT INTO Countries VALUES (null, 'MQ', 'Martinique');
INSERT INTO Countries VALUES (null, 'MR', 'Mauritania');
INSERT INTO Countries VALUES (null, 'MU', 'Mauritius');
INSERT INTO Countries VALUES (null, 'TY', 'Mayotte');
INSERT INTO Countries VALUES (null, 'MX', 'Mexico');
INSERT INTO Countries VALUES (null, 'FM', 'Micronesia, Federated States of');
INSERT INTO Countries VALUES (null, 'MD', 'Moldova, Republic of');
INSERT INTO Countries VALUES (null, 'MC', 'Monaco');
INSERT INTO Countries VALUES (null, 'MN', 'Mongolia');
INSERT INTO Countries VALUES (null, 'ME', 'Montenegro');
INSERT INTO Countries VALUES (null, 'MS', 'Montserrat');
INSERT INTO Countries VALUES (null, 'MA', 'Morocco');
INSERT INTO Countries VALUES (null, 'MZ', 'Mozambique');
INSERT INTO Countries VALUES (null, 'MM', 'Myanmar');
INSERT INTO Countries VALUES (null, 'NA', 'Namibia');
INSERT INTO Countries VALUES (null, 'NR', 'Nauru');
INSERT INTO Countries VALUES (null, 'NP', 'Nepal');
INSERT INTO Countries VALUES (null, 'NL', 'Netherlands');
INSERT INTO Countries VALUES (null, 'AN', 'Netherlands Antilles');
INSERT INTO Countries VALUES (null, 'NC', 'New Caledonia');
INSERT INTO Countries VALUES (null, 'NZ', 'New Zealand');
INSERT INTO Countries VALUES (null, 'NI', 'Nicaragua');
INSERT INTO Countries VALUES (null, 'NE', 'Niger');
INSERT INTO Countries VALUES (null, 'NG', 'Nigeria');
INSERT INTO Countries VALUES (null, 'NU', 'Niue');
INSERT INTO Countries VALUES (null, 'NF', 'Norfolk Island');
INSERT INTO Countries VALUES (null, 'MP', 'Northern Mariana Islands');
INSERT INTO Countries VALUES (null, 'NO', 'Norway');
INSERT INTO Countries VALUES (null, 'OM', 'Oman');
INSERT INTO Countries VALUES (null, 'PK', 'Pakistan');
INSERT INTO Countries VALUES (null, 'PW', 'Palau');
INSERT INTO Countries VALUES (null, 'PS', 'Palestine');
INSERT INTO Countries VALUES (null, 'PA', 'Panama');
INSERT INTO Countries VALUES (null, 'PG', 'Papua New Guinea');
INSERT INTO Countries VALUES (null, 'PY', 'Paraguay');
INSERT INTO Countries VALUES (null, 'PE', 'Peru');
INSERT INTO Countries VALUES (null, 'PH', 'Philippines');
INSERT INTO Countries VALUES (null, 'PN', 'Pitcairn');
INSERT INTO Countries VALUES (null, 'PL', 'Poland');
INSERT INTO Countries VALUES (null, 'PT', 'Portugal');
INSERT INTO Countries VALUES (null, 'PR', 'Puerto Rico');
INSERT INTO Countries VALUES (null, 'QA', 'Qatar');
INSERT INTO Countries VALUES (null, 'RE', 'Reunion');
INSERT INTO Countries VALUES (null, 'RO', 'Romania');
INSERT INTO Countries VALUES (null, 'RU', 'Russian Federation');
INSERT INTO Countries VALUES (null, 'RW', 'Rwanda');
INSERT INTO Countries VALUES (null, 'KN', 'Saint Kitts and Nevis');
INSERT INTO Countries VALUES (null, 'LC', 'Saint Lucia');
INSERT INTO Countries VALUES (null, 'VC', 'Saint Vincent and the Grenadines');
INSERT INTO Countries VALUES (null, 'WS', 'Samoa');
INSERT INTO Countries VALUES (null, 'SM', 'San Marino');
INSERT INTO Countries VALUES (null, 'ST', 'Sao Tome and Principe');
INSERT INTO Countries VALUES (null, 'SA', 'Saudi Arabia');
INSERT INTO Countries VALUES (null, 'SN', 'Senegal');
INSERT INTO Countries VALUES (null, 'RS', 'Serbia');
INSERT INTO Countries VALUES (null, 'SC', 'Seychelles');
INSERT INTO Countries VALUES (null, 'SL', 'Sierra Leone');
INSERT INTO Countries VALUES (null, 'SG', 'Singapore');
INSERT INTO Countries VALUES (null, 'SK', 'Slovakia');
INSERT INTO Countries VALUES (null, 'SI', 'Slovenia');
INSERT INTO Countries VALUES (null, 'SB', 'Solomon Islands');
INSERT INTO Countries VALUES (null, 'SO', 'Somalia');
INSERT INTO Countries VALUES (null, 'ZA', 'South Africa');
INSERT INTO Countries VALUES (null, 'GS', 'South Georgia South Sandwich Islands');
INSERT INTO Countries VALUES (null, 'ES', 'Spain');
INSERT INTO Countries VALUES (null, 'LK', 'Sri Lanka');
INSERT INTO Countries VALUES (null, 'SH', 'St. Helena');
INSERT INTO Countries VALUES (null, 'PM', 'St. Pierre and Miquelon');
INSERT INTO Countries VALUES (null, 'SD', 'Sudan');
INSERT INTO Countries VALUES (null, 'SR', 'Suriname');
INSERT INTO Countries VALUES (null, 'SJ', 'Svalbard and Jan Mayen Islands');
INSERT INTO Countries VALUES (null, 'SZ', 'Swaziland');
INSERT INTO Countries VALUES (null, 'SE', 'Sweden');
INSERT INTO Countries VALUES (null, 'CH', 'Switzerland');
INSERT INTO Countries VALUES (null, 'SY', 'Syrian Arab Republic');
INSERT INTO Countries VALUES (null, 'TW', 'Taiwan');
INSERT INTO Countries VALUES (null, 'TJ', 'Tajikistan');
INSERT INTO Countries VALUES (null, 'TZ', 'Tanzania, United Republic of');
INSERT INTO Countries VALUES (null, 'TH', 'Thailand');
INSERT INTO Countries VALUES (null, 'TG', 'Togo');
INSERT INTO Countries VALUES (null, 'TK', 'Tokelau');
INSERT INTO Countries VALUES (null, 'TO', 'Tonga');
INSERT INTO Countries VALUES (null, 'TT', 'Trinidad and Tobago');
INSERT INTO Countries VALUES (null, 'TN', 'Tunisia');
INSERT INTO Countries VALUES (null, 'TR', 'Turkey');
INSERT INTO Countries VALUES (null, 'TM', 'Turkmenistan');
INSERT INTO Countries VALUES (null, 'TC', 'Turks and Caicos Islands');
INSERT INTO Countries VALUES (null, 'TV', 'Tuvalu');
INSERT INTO Countries VALUES (null, 'UG', 'Uganda');
INSERT INTO Countries VALUES (null, 'UA', 'Ukraine');
INSERT INTO Countries VALUES (null, 'AE', 'United Arab Emirates');
INSERT INTO Countries VALUES (null, 'GB', 'United Kingdom');
INSERT INTO Countries VALUES (null, 'US', 'United States');
INSERT INTO Countries VALUES (null, 'UM', 'United States minor outlying islands');
INSERT INTO Countries VALUES (null, 'UY', 'Uruguay');
INSERT INTO Countries VALUES (null, 'UZ', 'Uzbekistan');
INSERT INTO Countries VALUES (null, 'VU', 'Vanuatu');
INSERT INTO Countries VALUES (null, 'VA', 'Vatican City State');
INSERT INTO Countries VALUES (null, 'VE', 'Venezuela');
INSERT INTO Countries VALUES (null, 'VN', 'Vietnam');
INSERT INTO Countries VALUES (null, 'VG', 'Virgin Islands (British)');
INSERT INTO Countries VALUES (null, 'VI', 'Virgin Islands (U.S.)');
INSERT INTO Countries VALUES (null, 'WF', 'Wallis and Futuna Islands');
INSERT INTO Countries VALUES (null, 'EH', 'Western Sahara');
INSERT INTO Countries VALUES (null, 'YE', 'Yemen');
INSERT INTO Countries VALUES (null, 'ZR', 'Zaire');
INSERT INTO Countries VALUES (null, 'ZM', 'Zambia');
INSERT INTO Countries VALUES (null, 'ZW', 'Zimbabwe');

INSERT INTO EducationLevels VALUES (null, 'Inexistente');
INSERT INTO EducationLevels VALUES (null, '4º ano');
INSERT INTO EducationLevels VALUES (null, '9º ano');
INSERT INTO EducationLevels VALUES (null, '12º ano');
INSERT INTO EducationLevels VALUES (null, 'Licenciatura');
INSERT INTO EducationLevels VALUES (null, 'Mestrado');
INSERT INTO EducationLevels VALUES (null, 'Doutoramento');
INSERT INTO EducationLevels VALUES (null, 'Outro');