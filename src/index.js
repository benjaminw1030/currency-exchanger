import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './services/exchange-rate-service.js';

function findExchangeRate(response, currency) {
  console.log(response.conversion_rates[currency])
  return response.conversion_rates[currency]
}

function outputExchange(amount, exchangeRate, currency) {
  let outputAmount = (amount * exchangeRate).toFixed(2);
  $('#currency-output').text(`This amount of USD is worth ${outputAmount} ${currency}`);
}

$(document).ready(function() {
  $('#currency-exchange-form').submit(function(event) {
    event.preventDefault();
    let amount = $("#USD-amount").val();
    let currency = $("#currency").val();
    ExchangeRateService.currencyExchange()
      .then(function (response) {
        let exchangeRate = findExchangeRate(response, currency);
        outputExchange(amount, exchangeRate, currency);
      });
    $('#currency-output').append(`<p></p>`);
  });
});