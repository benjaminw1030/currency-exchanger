import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-service.js';

function outputExchange(amount, currency, response) {
  if (response.result === 'success') {
  let outputAmount = (amount * response.conversion_rates[currency]).toFixed(2);
  $('#currency-output').text(`This amount of USD is worth ${outputAmount} ${currency}`);
  } else {
    $('#error-output').text(`There was an error: ${response.message}.`)
  }
}

$(document).ready(function () {
  $('#currency-exchange-form').submit(function (event) {
    event.preventDefault();
    let amount = $('#USD-amount').val();
    let currency = $('#currency').val();
    ExchangeRateService.currencyExchange()
      .then(function (response) {
        outputExchange(amount, currency, response);
      });
  });
});