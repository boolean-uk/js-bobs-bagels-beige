const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')
const accountSid = 'AC7d0edacf723d12693bbaf087a5ae0870'
const authToken = '51bb8e9a9a0f92eb23d4e9181028f219'
const client = require('twilio')(accountSid, authToken)

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
const basket = new Basket(40)
basket.addContactNumber('+447555336254')
basket.addBagel('BGLP', 13)
basket.addBagel('BGLO', 7)
basket.addBagel('BGLE', 9)
basket.addBagel('COF', 2)
basket.countBagelsInBasket()
const testReceipt = new Receipt(basket.countBagelsInBasket())
const timer = new Date()
const deilveryTime = `${timer.getMinutes() > 44 ? (timer.getHours() + 1) % 24 : timer.getHours()}:${(timer.getMinutes() + 15) % 60}`
client.messages
  .create({
    body: `${testReceipt.getReceipt()}\nEstimated Delivery: ${deilveryTime}`,
    from: '+447360494355',
    to: `${basket.contactNumber}`
  })
  .then(message => console.log(message.status))
module.exports = Receipt
