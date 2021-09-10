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
  console.log(response)
  if (response.result === 'success') {
    let exchangeRate = response.conversion_rates[currency2];
    if (exchangeRate === undefined) {
      $('#error-output').text(`There was an error: currency to convert to does not exist.`);
    } else {
      let outputAmount = (amount * exchangeRate).toFixed(2);
      $('#currency-output').text(`${amount.toFixed(2)} ${currency1} is worth ${outputAmount} ${currency2}.`);
    }
  } else {
    $('#error-output').text(`There was an error: ${response.message}. Check currency to convert from.`);
  }
}

$(document).ready(function () {
  $('#currency-exchange-form').submit(function (event) {
    event.preventDefault();
    let amount = parseFloat($('#amount').val());
    let currency1 = $('#currency-1').val();
    let currency2 = $('#currency-2').val();
    let currencyOther1 = ($('#currency-other-1').val()).toUpperCase();
    let currencyOther2 = ($('#currency-other-2').val()).toUpperCase();
    if (isNaN(amount)) {
      amount = 0;
    }
    if (currencyOther1 !== '') {
      currency1 = currencyOther1;
    }
    if (currencyOther2 !== '') {
      currency2 = currencyOther2;
    }
    if (currency1 === '' || currency2 === '') {
      $('#error-output').text('Please select a currency.');
    } else {
      ExchangeRateService.currencyExchange(currency1)
        .then(function (response) {
          reset();
          outputExchange(amount, currency1, currency2, response);
        });
    }
  });
});