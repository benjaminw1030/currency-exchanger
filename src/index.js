import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Template from './js/template.js';

$(document).ready(function() {
  $('#triangle-checker-form').submit(function(event) {
    event.preventDefault();

    $('#response').append("<p>" + response + "</p>");
  });
});