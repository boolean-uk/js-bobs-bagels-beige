const Bagel = require('../src/bagel.js')

describe('Bagel:', () => {
  describe('New', () => {
    it('instance with valid sku and default quantity', () => {
      const bagel = new Bagel('BGSE')

      const expected = {
        sku: 'BGSE',
        price: '2.99',
        name: 'Bagel Sandwich',
        variant: 'Everything',
        fillings: ['Bacon', 'Egg', 'Cheese'],
        quantity: 1
      }

      const result = bagel.details

      expect(result).toEqual(expected)
    })

    it('instance with valid sku and custom quantity', () => {
      const bagel = new Bagel('BGLS', 3)

      const expected = {
        sku: 'BGLS',
        price: '0.49',
        name: 'Bagel',
        variant: 'Sesame',
        quantity: 3,
        fillings: []
      }

      const result = bagel.details

      expect(result).toEqual(expected)
    })

    it('instance with invalid sku throw invalid sku error', () => {
      const bagel = () => new Bagel('ZZZZ1234AAAA')

      expect(bagel).toThrowError('sku not found')
    })

    // it('instance with quantity not at least 1', () => {
    //   const bagel = () => new Bagel('BGLS', 0.5)

    //   expect(bagel).toThrowError('quantity must be at least 1')
    // })
  })
})
