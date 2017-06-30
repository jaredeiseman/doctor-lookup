var apiKey = require('./../.env').apiKey;

var AppModule = function() {
  this.baseURI = 'https://api.betterdoctor.com/2016-03-01';
}

/*
Test if object is empty for makeQueryString params option
Usage: isEmpty(objectToBeTested)
Returns: boolean
 */
function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

/*
Construct query string to be used by $.get() requests.
Usage: AppModule.makeQueryString(endpoint, { list of params in key:value pairs })
Returns: Query string
 */
AppModule.prototype.makeQueryString = function(endpoint, params) {
  var queryString = '';
  queryString += `${this.baseURI}${endpoint}?user_key=${apiKey}`;
  if (!isEmpty(params)) {
    for (var key in params) {
      queryString += `&${key}=${params[key]}`;
    }
  }
  return queryString;
}

/*
Retrieve data object with list of specialties and sort alphabetically
Usage: AppModule.getSpecialties()
Returns: null, but executes function to display info on page
 */
AppModule.prototype.getSpecialties = function(displaySpecialties) {
  $.get(this.makeQueryString('/specialties', {}))
    .then((res) => {
      var sortedList = res.data.sort(function(a,b) {
        var keyA = a.name, keyB = b.name;
        if (keyA < keyB) { return -1; }
        if (keyA > keyB) { return 1; }
        return 0;
      });
      displaySpecialties(sortedList);
    })
    .fail(() => {
      console.log('There was an error');
    });
}

/*
Retrieve data object with list of doctors that meet search criteria
Usage: AppModule.getDoctors(loc, symptom, specialty)
Returns: null, but executes function to display info on page
 */
AppModule.prototype.getDoctors = function(loc, symptom, specialty = '') {
  var params = {
    location: loc,
    user_location: loc,
    medicalIssue: symptom
  }
  if (specialty !== '') {
    params.specialty_uid = specialty;
  }
  $.get(this.makeQueryString('/doctors', params))
    .then((res) => {
      console.log(res);
    });
}

exports.appModule = AppModule;
