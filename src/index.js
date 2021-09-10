import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-service.js';

function outputExchange(amount, currency, response) {
  if (response.result === 'success' && response.conversion_rates[currency] !== undefined) {
    console.log(response.result)
    let outputAmount = (amount * response.conversion_rates[currency]).toFixed(2);
    $('#currency-output').text(`This amount of USD is worth ${outputAmount} ${currency}`);
  } else if (response.result === 'success' && response.conversion_rates[currency] === undefined) {
    $('#error-output').text(`There was an error: currency to obtain does not exist.`)
  } else if (response.result === 'error' && response['error-type'] === 'unsupported-code') {
    $('#error-output').text(`There was an error: currency to exchange does not exist.`)
  } else {
    $('#error-output').text(`There was an error: ${response.message}.`)
  }
}

$(document).ready(function () {
  $('#currency-exchange-form').submit(function (event) {
    event.preventDefault();
    let amount = $('#amount').val();
    let currency1 = $('#currency-1').val();
    let currency2 = $('#currency-2').val();
    if (currency1 === 'other') {
      currency1 = $('#currency-other-1').val();
    }
    if (currency2 === 'other') {
      currency2 = $('#currency-other-2').val();
    }
    ExchangeRateService.currencyExchange(currency1)
      .then(function (response) {
        outputExchange(amount, currency2, response);
      });
  });
});