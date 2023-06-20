const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')

class Receipt {
  constructor (obj = {}) {
    this.savings = 0
    this.purchases = obj
    this.date = new Date()
    this.total = 0
  }

  getReceipt () {
    return `
    ~~~ Bob's Bagels ~~~    

       ${this.date.toDateString()}
----------------------------

${this.getPurchaseList()}

Total                 £${Number(this.total.toFixed(2))}

  You saved a total of £${this.savings.toFixed(2)}
        on this shop  

        Thank you
      for your order!         `
  }

  getPurchaseList () {
    this.total = 0
    let purchaseLines = ''
    for (const key in this.purchases) {
      let receiptLine = ''
      receiptLine += Bagel.getTypeOfBagel(key)
        ? Bagel.getTypeOfBagel(key)
        : 'Coffee'
      for (let i = 0; i < 19; i++) {
        if (receiptLine.length < 19) {
          receiptLine += ' '
        }
      }
      receiptLine += this.purchases[`${key}`]
      for (let i = 0; i < 4; i++) {
        if (receiptLine.length < 23) {
          receiptLine += ' '
        }
      }
      receiptLine += '£'
      const subtotal = Basket.getSubtotal(this.purchases, key)
      receiptLine += subtotal[0]
      this.total += subtotal[0]
      this.savings += subtotal[1]
      purchaseLines += `${receiptLine}\n`
      purchaseLines += subtotal[1] > 0.00 ? `                     (-£${subtotal[1].toFixed(2)})\n` : ''
    }
    return purchaseLines
  }
}
// const basket = new Basket()
// basket.addBagel('BGLO', 4)
// basket.addBagel('BGLP', 15)
// basket.addBagel('BGLE', 7)
// basket.addBagel('COF', 3)
// const testReceipt = new Receipt(basket.countBagelsInBasket())
// basket.attachReceipt(testReceipt.getReceipt())
// basket.addContactNumber('+447555336254')
// basket.twilioReceiptSender()
module.exports = Receipt
