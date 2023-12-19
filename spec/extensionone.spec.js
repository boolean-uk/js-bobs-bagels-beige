/*
As a Bob's Bagels customer,
So I can decide the best bagel for me,
I'd like to check the price of a specific type of bagel.

As a Bob's Bagels customer,
So I can get value for money,
I'd like to know the special offers for a specific type of bagel.

As a Bob's Bagels customer,
So that I can feel like a valued customer,
I'd like to get the special deals whenever they apply.
*/

const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')

describe('Deals', () => {
  let basket
  let bagel

  beforeEach(() => {
    basket = new Basket(31)
    bagel = new Bagel('BGLO', 1)
  })

  it('check price of type of bagel', () => {
    const expected = '0.49'
    const result = bagel.price
    expect(result).toEqual(expected)
  })

  it('check deal for a type of bagel', () => {
    const expected = '6 Onion Bagels for 2.49'
    const result = basket.getBagelOffer('BGLO')
    expect(result).toEqual(expected)
  })

  it('check for the coffee deal', () => {
    const expected = 'buy a coffee and plain bagel for 1.25'
    const result = basket.getBagelOffer('COF')
    expect(result).toEqual(expected)
  })

  it('price totals should account for a deal', () => {
    const expected = 5.55
    basket.addBagel('BGLP', 16)
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })

  it('calculate total for a large deal', () => {
    const expected = 10.43
    basket.addBagel('BGLP', 12)
    basket.addBagel('BGLO', 2)
    basket.addBagel('BGLE', 6)
    basket.addBagel('COF', 3)
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })

  it('calculate deal for coffee and plain donut', () => {
    const expected = 1.25
    basket.addBagel('BGLP')
    basket.addBagel('COF')
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })

  it('another large deal', () => {
    const expected = 13.17
    basket.addBagel('BGLP', 13)
    basket.addBagel('BGLO', 7)
    basket.addBagel('BGLE', 9)
    basket.addBagel('COF', 2)
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })
})
