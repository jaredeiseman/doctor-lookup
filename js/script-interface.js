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
Helper function to format phone numbers from default 1234567890 format to 123-456-7890
Usage: formatPhoneNumber(number)
Returns: formatted phone number
 */
function formatPhoneNumber(num) {
  var formatted = num.split("");
  formatted.splice(3, 0, '-');
  formatted.splice(7, 0, '-');
  formatted = formatted.join("");
  return formatted;
}

/*
Display details about appropriate doctors/practices to the page
Usage: displayDoctors([{doctor}, ...])
Returns: null, but displays the appropriate information to the page
 */
function displayDoctors(data) {
  $('#output').empty();
  if (data.length === 0) {
    displayNoMatches();
    return;
  }
  data.forEach(function(doctor) {
    $('#output').append(`<div class="card"><h3 class="name"></h3><p class="bio"></p><h4 class="practices">Practices</h4></div>`);

    $('.name').last().text(`Dr. ${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}`);

    if (doctor.profile.bio) {
      $('.bio').last().text(`${doctor.profile.bio}`);
    }

    doctor.practices.forEach(function(practice) {
      $('.card').last().append(`<div class="practice-card"><h4>${practice.name}</h4><p>${formatPhoneNumber(practice.phones[0].number)}</p><p>${practice.visit_address.street}, ${practice.visit_address.city}, ${practice.visit_address.state}, ${practice.visit_address.zip}</p></div>`);
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
