import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-service.js';

function reset() {
  $('#amount').val('');
  $('#currency-other-1').val('');
  $('#currency-other-2').val('');
  $('#error-output').text('');
  $('#currency-output').text('');
}

function outputExchange(amount, currency1, currency2, response) {
  if (response.result === 'success' && response.conversion_rates[currency2] !== undefined) {
    let outputAmount = (amount * response.conversion_rates[currency2]).toFixed(2);
    $('#currency-output').text(`This amount of ${currency1} is worth ${outputAmount} ${currency2}`);
  } else if (response.result === 'success' && response.conversion_rates[currency1] === undefined) {
    $('#error-output').text(`There was an error: currency to convert to does not exist.`);
  } else {
    $('#error-output').text(`There was an error: ${response.message}. Check currency to convert from.`);
  }
}

$(document).ready(function () {
  $('#currency-exchange-form').submit(function (event) {
    event.preventDefault();
    let amount = $('#amount').val();
    let currency1 = $('#currency-1').val();
    let currency2 = $('#currency-2').val();
    let currencyOther1 = ($('#currency-other-1').val()).toUpperCase();
    let currencyOther2 = ($('#currency-other-2').val()).toUpperCase();
    if (currencyOther1 !== '') {
      currency1 = currencyOther1;
    }
    if (currencyOther2 !== '') {
      currency2 = currencyOther2;
    }
    ExchangeRateService.currencyExchange(currency1)
      .then(function (response) {
        reset();
        outputExchange(amount, currency1, currency2, response);
      });
  });
});