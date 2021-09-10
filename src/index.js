import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-service.js';

function currencyCalc(amount, currency) {

}

$(document).ready(function() {
  $('#currency-exchange-form').submit(function(event) {
    event.preventDefault();
    let amount = $("#USD-amount").val();
    let currency = $("#currency").val();
    ExchangeRateService.currencyExchange()
      .then(function (response) {
        currencyCalc(response);
      });
    $('#currency-output').append(`<p></p>`);
  });
});