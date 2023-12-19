/* eslint-disable no-undef */
const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it(', when first created, is empty', () => {
    const expected = []
    const result = basket.contents
    expect(result).toEqual(expected)
  })

  it('– item price is returned before addition', () => {
    const testBagel = new Bagel('BGLO')
    const expected = testBagel.price
    const result = basket.getPriceOfBagel('BGLO')
    expect(result).toEqual(expected)
  })

  it('item added', () => {
    const expected = [new Bagel('BGLO')]
    const result = basket.addBagel('BGLO')
    expect(result).toEqual(expected)
  })

  describe('invalid sku', () => {
    it('- lower case', () => {
      const result = () => basket.addBagel('bglo')
      expect(result).toThrowError('invalid sku - should be capitalised')
    })
    it('- length should be 3 or 4 char', () => {
      const result = () => basket.addBagel('DBDHEFNGG')
      expect(result).toThrowError(
        'invalid sku - should contain 3 or 4 characters'
      )
    })
    it('- not a string', () => {
      const result = () => basket.addBagel(42)
      expect(result).toThrowError('invalid sku - should be of type string')
    })
    it('- does not exist', () => {
      const result = () => basket.addBagel()
      expect(result).toThrowError('no sku passed')
    })
  })

  it('second item added', () => {
    const expected = [new Bagel('BGLO'), new Bagel('BGLP')]
    basket.addBagel('BGLO')
    const result = basket.addBagel('BGLP')
    expect(result).toEqual(expected)
  })

  it('quantity increases when same item is added', () => {
    basket.addBagel('BGLO')
    const result = basket.addBagel('BGLO')
    expect(result[0].quantity).toEqual(2)
    expect(result.length).toEqual(1)
  })

  it('item removed', () => {
    const expected = []
    basket.addBagel('BGLO')
    const result = basket.removeBagel('BGLO')

    expect(result).toEqual(expected)
  })

  it('when full, user is informed of that', () => {
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    const result = basket.isFull()
    expect(result).toBeFalse()
  })

  it('when full, user is informed of that', () => {
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    const result = basket.isFull()
    expect(result).toBeTrue()
  })

  it('prevent adding bagels past basket capacity', () => {
    // shouldn't be able to add 4 bagels to basket of capacity 3.
    const expected = 'Basket is full!'
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    const result = () => basket.addBagel('BGLO')
    expect(result).toThrowError(expected)
  })

  it('created with larger capacity', () => {
    const expected = true
    const largeBasket = new Basket(5)
    const result = largeBasket.capacity > basket.capacity
    expect(result).toEqual(expected)
  })

  it("when item isn't found, user is informed of failed removal", () => {
    const result = () => basket.removeBagel(1)
    expect(result).toThrowError('bagel not found')
  })

  it('shows total sum of bagels', () => {
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    const result = basket.getTotal()
    expect(result).toEqual(1.47)
  })

  it('contains', () => {
    basket.addBagel('BGLO')
    basket.addBagel('BGLE')
    const result = basket.contains('BGLO')
    expect(result).toBeTrue()
  })

  it('does not contain', () => {
    basket.addBagel('BGLO')
    basket.addBagel('BGLE')
    const result = basket.contains('BGLP')
    expect(result).toBeFalse()
  })
})
