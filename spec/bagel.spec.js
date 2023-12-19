const Bagel = require('../src/bagel.js')

describe('Bagel:', () => {
  describe('New -', () => {
    it('new instance with valid sku', () => {
      const bagel = new Bagel('BGLS', 3)

      const expected = {
        sku: 'BGLS',
        price: '0.49',
        name: 'Bagel',
        variant: 'Sesame',
        quantity: 3
      }

      const result = bagel.details

      expect(result).toEqual(expected)
    })
  })
})
