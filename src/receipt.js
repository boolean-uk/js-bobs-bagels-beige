const Bagel = require('../src/bagel.js')
const Basket = require('../src/basket.js')
const accountSid = 'AC7c58fb9d8b144232bb704c036836aa4c';
const authToken = '43165cf4c8b4a0d14ca83eeb45fa9f4f';
const client = require('twilio')(accountSid, authToken);

class Receipt {
  constructor (obj = {}) {
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
      const savings = Basket.getSavings(this.purchases, key)
      receiptLine += subtotal
      this.total += subtotal
      if (savings !== 0) {
        purchaseLines += `${receiptLine}\n                     (-£${savings})\n`
      } else {
        purchaseLines += `${receiptLine}\n`
      }
    }

    return purchaseLines
  }

}

function generateRandomValue() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomValue = '';
  
  for (let i = 0; i < 5; i++) {
    randomValue += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return randomValue;
}

function generateRandomDeliveryTime() {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);

  // Format the hours and minutes as two-digit strings
  // const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return formattedMinutes;
}
let basket = new Basket(40)

basket.addBagel('BGLO', 4)
basket.addBagel('BGLP', 15)
basket.addBagel('BGLE', 7)
basket.addBagel('COF', 3)
const testReceipt = new Receipt(basket.countBagelsInBasket())
testReceipt.getReceipt()

client.messages
    .create({
        body: `Hey there, thank you for your order. Here is your receipt: ${testReceipt.getReceipt()}\nYour order is ${generateRandomValue()}.\nPlease pick up your order in ${generateRandomDeliveryTime()} minutes!`,
        from: '+12178338475',
        to: '+351912121304'
    })
    .then(message => console.log(message.sid))
    .done();
module.exports = Receipt
