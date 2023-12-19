const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')

describe('Deals', () => {
  let basket
  let bagel

  beforeEach(() => {
    basket = new Basket(31)
    bagel = new Bagel('BGLO')
  })

  it('check price of type of bagel', () => {
    const expected = '0.49'
    const result = bagel.price
    expect(result).toEqual(expected)
  })

  it('check deal for a type of bagel', () => {
    const expected = '6 Onion Bagels for 2.49'
    const result = bagel.offer
    expect(result).toEqual(expected)
  })

  it('check for the coffee deal', () => {
    const testBagel = new Bagel('COF')
    const expected = 'buy a coffee and plain bagel for 1.25'
    const result = testBagel.offer
    expect(result).toEqual(expected)
  })

  it('price totals should account for a deal', () => {
    const expected = 5.55
    basket.addBagel('BGLP')
    basket.contents[0].setQuantity(16)
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })

  it('calculate total for a large deal', () => {
    const expected = 10.43
    basket.addBagel('BGLP')
    basket.contents[0].setQuantity(12)
    basket.addBagel('BGLO')
    basket.contents[1].setQuantity(2)
    basket.addBagel('BGLE')
    basket.contents[2].setQuantity(6)
    basket.addBagel('COF')
    basket.contents[3].setQuantity(3)
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })

  it('calculate deal for coffee and plain donut', () => {
    const expected = 1.25
    basket.addBagel('BGLP')
    // basket.addBagel('COF')
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })

  it('another large deal', () => {
    const expected = 3.99 + 2.49 + 0.49 + 2.49 + 3 * 0.49 + 1.25 + 0.99
    basket.addBagel('BGLP')
    basket.contents[0].setQuantity(13)
    basket.addBagel('BGLO')
    basket.contents[1].setQuantity(7)
    basket.addBagel('BGLE')
    basket.contents[2].setQuantity(9)
    basket.addBagel('COF', 2)
    basket.contents[3].setQuantity(2)
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })
})
