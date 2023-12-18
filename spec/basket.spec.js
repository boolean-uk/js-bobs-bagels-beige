/* eslint-disable no-undef */
const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')

// Would use a few more describe blocks to add clarity to the tests, especially to their messages

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  // is this necessary? Also 'Basket basket is empty' -> redundancies in the message
  it('basket is empty', () => {
    const expected = []
    const result = basket.contents
    expect(result).toEqual(expected)
  })

  it('get price of bagel before adding to basket', () => {
    const testBagel = new Bagel('BGLO')
    const expected = testBagel.price
    const result = basket.getPriceOfBagel('BGLO')
    expect(result).toEqual(expected)
  })

  // redundancy in the message
  it('add item to basket', () => {
    const expected = [new Bagel('BGLO', 1)]

    const result = basket.addBagel('BGLO')

    expect(result).toEqual(expected)
  })

  // redundancy in the message & potentially insufficient checks
  // would add more that one item to the basket so and add expect(result[0].sku).toEqual('bagelthatwasnotremove.sku') to check that the remove method works properly, and does not just empty the whole basket, or get rid of the first or last element in the array, no matter whether it is or is not a match
  it('remove item from basket', () => {
    const expected = []
    basket.addBagel('BGLO')
    const result = basket.removeBagel(1)

    expect(result).toEqual(expected)
  })

  it('add a second bagel to basket', () => {
    const expected = [new Bagel('BGLO', 1), new Bagel('BGLO', 2)]
    basket.addBagel('BGLO')
    const result = basket.addBagel('BGLO')
    expect(result).toEqual(expected)
  })

  // unclear message 'Basket when Basket is full'
  // not testing what happens if the basket is not full
  it('when Basket is full', () => {
    const expected = 'basket is full'
    basket.addBagel('BGLO', 4)
    const result = basket.basketIsFull()
    expect(result).toEqual(expected)
  })

  // redundancy in the message
  // should perhaps check which bagels made it to the basket - the contents should be unchanged, and not just of the same length.
  it('prevent adding bagels past basket capacity', () => {
    // shouldn't be able to add 4 bagels to basket of capacity 3.
    const expected = 3
    basket.addBagel('BGLO', 4)
    const result = basket.contents.length
    expect(result).toEqual(expected)
  })

  // what if I attempt this with a smaller number? 0? A negative number? anything but an integer?
  // also, why test that it is bigger than the capacity of the basket we made first instead of making sure it is the expected number?
  it('create basket with larger capacity', () => {
    const expected = true
    const largeBasket = new Basket(5)
    const result = largeBasket.capacity > basket.capacity
    expect(result).toEqual(expected)
  })

  // redundancy in the message
  it("cannot remove an item that isn't in the basket", () => {
    const expected = "Bagel isn't in basket"
    const result = basket.removeBagel(1)
    expect(result).toEqual(expected)
  })

  // redundancy in the message
  // does not check that getTotal() can handle doing the sum of different quantities of different types of bagels.
  // what if the basket is empty?
  it('total sum of bagels in my basket ', () => {
    const expected = 3 * 0.49
    basket.addBagel('BGLO', 3)
    basket.countBagelsInBasket()
    const result = basket.getTotal()
    expect(result).toEqual(expected)
  })
})
