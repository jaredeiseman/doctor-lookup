var App = require('./../js/script.js').appModule;
var app = new App();

/*
Display a message to the page indicating no results have been found, to be used in conjunction with a check on the data length returned from a query
Usage: displayNoMatches()
Returns: null, but displays "I'm sorry, but there were no matching doctors to your search criteria. Please revise your search and try again." to the page.
 */
function displayNoMatches() {
  $('#output').append(`<p>I'm sorry, but there were no matching doctors to your search criteria. Please revise your search and try again.</p>`);
}

/*
Populate the select box containing the specialties available in the database.
Usage: displaySpecialties(['specialty', ...])
Returns: null, but displays the appropriate information to the page
 */
function displaySpecialties(data) {
  data.forEach(function(specialty) {
    $('#specialty').append(`<option value="${specialty.uid}">${specialty.name}</option>`);
  });
}

/*
Display details about appropriate doctors/practices to the page
Usage: displayDoctors([{doctor}, ...])
Returns: null, but displays the appropriate information to the page
 */
function displayDoctors(data) {
  console.log(data);
  $('#output').empty();
  if (data.length === 0) {
    displayNoMatches();
    return;
  }
  data.forEach(function(doctor) {
    $('#output').append(`<h2>Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</h2>`);
    if (doctor.profile.bio) {
      $('#output').append(`<p>${doctor.profile.bio}</p>`);
    }
    $('#output').append(`<h3>Practices</h3>`);
    doctor.practices.forEach(function(practice) {
      $('#output').append(`<p>Practice Name: ${practice.name}</p>`);
      $('#output').append(`<p>Phone Number: ${practice.phones[0].number}</p>`);
      $('#output').append(`<p>Address: ${practice.visit_address.street}, ${practice.visit_address.city}, ${practice.visit_address.state}, ${practice.visit_address.zip}`);
    });
  });
}

$(document).ready(function() {
  //Populate select box with available specialties on page load
  app.getSpecialties(displaySpecialties);

  $('#search-form').submit(function(e) {
    e.preventDefault();

    // Collect form data to be queried on
    var specialty = $('#specialty').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var range = $('#range').val();
    var symptom = $('#symptom').val();

    //execute query and pass callback for data display
    app.getDoctors(`${city},${state}`, range, symptom, specialty, displayDoctors);
  });
});
