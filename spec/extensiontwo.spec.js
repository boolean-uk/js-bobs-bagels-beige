const Basket = require('../src/basket.js')
const Receipt = require('../src/receipt.js')

describe('Receipts', () => {
  let basket
  let receipt

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
    const expected = 'Onion Bagel        2   £0.98\nPlain Bagel        12  £3.99\n                     (-£0.69)\nEverything Bagel   6   £2.49\n                     (-£0.45)\nWhite Coffee       3   £2.97\n'
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
    const expected = 'Onion Bagel        4   £1.96\nPlain Bagel        15  £4.77\n                     (-£1.08)\nEverything Bagel   7   £2.98\n                     (-£0.45)\nWhite Coffee       3   £2.97\n'
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
    basket.attachReceipt(testReceipt)
    const expected = basket.getTotal()
    console.log(testReceipt.getReceipt())
    const result = testReceipt.total
    expect(result).toEqual(expected)
  })
})
