const Bagel = require('../src/bagel.js')

describe('Bagel:', () => {
  it('new instance with valid sku', () => {
    const bagel = new Bagel('BGLS')

    const expected = {
      sku: 'BGLS',
      price: '0.49',
      name: 'Bagel',
      variant: 'Sesame',
      quantity: 1
    }

    const result = bagel.details

    expect(result).toEqual(expected)
  })
})
