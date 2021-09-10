import ExchangeRateService from './../src/services/exchange-rate-service.js';

describe('ExchangeRateService', () => {

  let template;

  beforeEach(() => {
    template = new Template();
  });

  test('description', () => {
    expect(Template.parameter).toEqual("something");
  });
});