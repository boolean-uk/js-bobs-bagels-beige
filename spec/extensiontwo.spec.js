/* eslint-disable no-undef */
const Basket = require('../src/basket.js')
const Receipt = require('../src/receipt.js')

describe('Receipts', () => {
  let basket

  beforeEach(() => {
    basket = new Basket(40)
  })

  it('return a blank receipt', () => {
    const testReceipt = new Receipt()
    const expected = ''
    const result = testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(result).toEqual(expected)
  })

  it('returns a receipt with all purchases', () => {
    basket.addBagel('BGLO', 2)
    basket.addBagel('BGLP', 12)
    basket.addBagel('BGLE', 6)
    basket.addBagel('COF', 3)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    const expected = 'Onion              2   £0.98\nPlain              12  £3.99\n                     (-£0.69)\nEverything         6   £2.49\n                     (-£0.45)\nCoffee             3   £2.97\n'
    const result = testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(result).toEqual(expected)
  })

  it('returns another receipt', () => {
    basket.addBagel('BGLO', 4)
    basket.addBagel('BGLP', 15)
    basket.addBagel('BGLE', 7)
    basket.addBagel('COF', 3)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    const expected = 'Onion              4   £1.96\nPlain              15  £4.77\n                     (-£1.08)\nEverything         7   £2.98\n                     (-£0.45)\nCoffee             3   £2.97\n'
    const result = testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(result).toEqual(expected)
  })

  it('returns correct total', () => {
    basket.addBagel('BGLO', 4)
    basket.addBagel('BGLP', 15)
    basket.addBagel('BGLE', 7)
    basket.addBagel('COF', 3)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    const expected = basket.getTotal()
    testReceipt.getReceipt()
    const result = testReceipt.total
    expect(result).toEqual(expected)
  })
  it('returns another receipt 2', () => {
    basket.addBagel('BGLO', 4)
    basket.addBagel('BGLP', 14)
    basket.addBagel('BGLE', 7)
    basket.addBagel('COF', 1)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    const expected = 'Onion              4   £1.96\nPlain              14  £4.64\n                     (-£0.82)\nEverything         7   £2.98\n                     (-£0.45)\nCoffee             1   £0.99\n'
    const result = testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(result).toEqual(expected)
  })

  it('returns savings', () => {
    basket.addBagel('BGLO', 4)
    basket.addBagel('BGLP', 14)
    basket.addBagel('BGLE', 7)
    basket.addBagel('COF', 1)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    const expectedTWO = 'Onion              4   £1.96\nPlain              14  £4.64\n                     (-£0.82)\nEverything         7   £2.98\n                     (-£0.45)\nCoffee             1   £0.99\n'
    const result = testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(result).toEqual(expectedTWO)
  })

  it('returns only savings for coffee', () => {
    basket.addBagel('BGLP', 4)
    basket.addBagel('COF', 3)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    const expectedTWO = 'Plain              4   £1.17\n                     (-£0.39)\nCoffee             3   £2.97\n'
    const result = testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(result).toEqual(expectedTWO)
  })

  it('returns a text message with receipt', () => {
    basket.addBagel('BGLO', 4)
    basket.addBagel('BGLP', 15)
    basket.addBagel('BGLE', 7)
    basket.addBagel('COF', 3)
    const testReceipt = new Receipt(basket.countBagelsInBasket())
    spyOn(testReceipt, 'sendReceiptViaSMS')
    testReceipt.getPurchaseList()
    testReceipt.getReceipt()
    expect(testReceipt.sendReceiptViaSMS).toHaveBeenCalled()
  })
})
