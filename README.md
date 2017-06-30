# Doctor Lookup

#### Utilizing the BetterDoctor API to locate doctors nearby capable of treating a particular symptom

#### By Jared Eiseman

## Description
An exercise in using an API to locate the appropriate doctor in a user specified location, to treat a user specified symptom.

## Planning

# Configuration/dependencies
* gulp-babel, babel-preset-es2015
  * For the transpiling of ES6 syntax
* bower-files
  * Brings necessary Bower dependencies together into single vendor files for use on the page
* browser-sync
  * Development dependency to facilitate the development process
* browserify
  * Clean dev code to be more production ready and browser friendly.
* del
  * To remove unnecessary files between builds
* gulp
  * Task manager for other development dependencies
* gulp-concat
  * Concatenate other files for faster processing of other dependencies (jshint, gulp-uglify, browserify, etc)
* gulp-jshint, jshint
  * Linting
* gulp-pug
  * Development dependency for simplified HTML syntax
* gulp-sass, gulp-sourcemaps
  * Development dependency for compiling scss/sass files into browser readable css files.
* gulp-uglify
  * Minification resource for production builds
* gulp-util
  * Utility to track env variables set from the command line (E.g. --production flag on build)
* vinyl-source-stream
  * Sourcing utility to facilitate browserify's actions
* jQuery
  * Library to facilitate simpler scripts

# Specs
| Behavior | Input | Output |
| - | - | - |
| App will construct query strings with variable input | app.makeQueryString() | https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey |
| App will retrieve a list of all specialities and sort them to alphabetical order | app.getSpecialties() | { list.of.specialities} |
| App will populate drop-down with list of specialties | displaySpecialties({ list }) | Select box populated |
| App will query /doctors endpoint with specialty if selected, location (2 letter state code), range from location, and symptom, retrieving list of appopriate doctors within a range | app.getDoctors(loc, symptom, specialty) | { list.of.doctors } |
| App will display the list of doctors related to the query to screen | displayDoctors({ list }) | Page appended with doctor information |

# UX/UI
* Develop custom style

# Polish
* Refactor minor portion of...
* Delete unused...
* Make README awesome

## Setup/Installation Requirements

* Clone the repository (https://github.com/jaredeiseman/doctor-lookup.git)
* Run 'npm install' in your chosen terminal application
* Run 'bower install' in your chosen terminal application
* Run 'gulp serve' in your chosen terminal application, then wait for your browser to be opened to the appropriate page.

## Known Bugs

There are no known bugs at this time.

## Support and contact details

For feedback or support contact Jared Eiseman at jathei@gmail.com.

## Technologies Used

* HTML
* Pug
* CSS
* Sass (Bourbon/Neat)
* JavaScript
* jQuery
* NPM
* Bower
* Gulp

### License

MIT

Copyright (c) 2017 Jared Eiseman
