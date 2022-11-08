const { findBySKU } = require('../src/utils/utils.js')

describe('utilities file', () => {


    it('should return a bagel from an sku argument', () => {
        // GIVEN
        const sku = 'BGLE'
        const expectation = {
            sku: "BGLE",
            price: "0.49",
            name: "Bagel",
            variant: "Everything",
          }

        // WHEN
        expect(findBySKU(sku)).toEqual(expectation)
    })
})