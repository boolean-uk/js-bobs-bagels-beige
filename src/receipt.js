const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')
const getTotal = require('./getTotal.js')

class Receipt {
  constructor(bagelsList = []) {
    this.purchases = bagelsList
    this.date = new Date()
    this.total = 0
  }

  // General
  getTotal() {
    this.total = getTotal(this.purchases)
    return this.total
  }

  // Rendering Receipt
  getReceipt() {
    return `
    ~~~ Bob's Bagels ~~~    

       ${this.date.toDateString()}
----------------------------
${this.getPurchaseList()}
Total                 £${Number(this.total.toFixed(2))}
        Thank you
      for your order!         `
  }

  // Rendering lines for receipt
  getPurchaseList() {
    let purchaseLines = ''

    this.purchases.forEach((item) => {
      let receiptLine = ''
      const key = item.SKU

      receiptLine += Bagel.getTypeOfBagel(key)
        ? Bagel.getTypeOfBagel(key)
        : 'Coffee'

      for (let i = 0; i < 19; i++) {
        if (receiptLine.length < 19) {
          receiptLine += ' '
        }
      }

      receiptLine += item.quantity

      for (let i = 0; i < 4; i++) {
        if (receiptLine.length < 23) {
          receiptLine += ' '
        }
      }

      receiptLine += '£'

      const subtotal = Basket.getSubtotal(this.purchases, key)
      receiptLine += subtotal
      purchaseLines += `${receiptLine}\n`
    })

    return purchaseLines
  }
}
module.exports = Receipt
