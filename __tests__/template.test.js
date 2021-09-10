import Template from './../src/js/template.js';

describe('Template', () => {

  let template;

  beforeEach(() => {
    template = new Template();
  });

  test('description', () => {
    expect(Template.parameter).toEqual("something");
  });
});