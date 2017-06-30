var App = require('./../js/script.js').appModule;
var app = new App();

function displaySpecialties(data) {
  data.forEach(function(specialty) {
    $('#specialty').append(`<option value="${specialty.uid}">${specialty.name}</option>`);
  });
}

$(document).ready(function() {

  app.getSpecialties(displaySpecialties);
  app.getDoctors('OR', 'sore throat');

});
