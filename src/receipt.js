const Bagel = require('../src/bagel.js');
const Basket = require('../src/basket.js');
const accountSid = 'AC7c58fb9d8b144232bb704c036836aa4c';
const authToken = '43165cf4c8b4a0d14ca83eeb45fa9f4f';
const client = require('twilio')(accountSid, authToken);

class Receipt {
  constructor(obj = {}) {
    this.purchases = obj;
    this.date = new Date();
    this.total = 0;
  }

  getReceipt() {
    return `
    ~~~ Bob's Bagels ~~~    

       ${this.date.toDateString()}
----------------------------
${this.getPurchaseList()}
Total                 £${Number(this.total.toFixed(2))}
        Thank you
      for your order!         `;
  }

  getPurchaseList() {
    this.total = 0;
    let purchaseLines = '';
    for (const key in this.purchases) {
      let receiptLine = '';
      receiptLine += Bagel.getTypeOfBagel(key) ? Bagel.getTypeOfBagel(key) : 'Coffee';
      for (let i = 0; i < 19; i++) {
        if (receiptLine.length < 19) {
          receiptLine += ' ';
        }
      }
      receiptLine += this.purchases[`${key}`];
      for (let i = 0; i < 4; i++) {
        if (receiptLine.length < 23) {
          receiptLine += ' ';
        }
      }
      receiptLine += '£';
      const subtotal = Basket.getSubtotal(this.purchases, key);
      const savings = Basket.getSavings(this.purchases, key);
      receiptLine += subtotal;
      this.total += subtotal;
      if (savings !== 0) {
        purchaseLines += `${receiptLine}\n                     (-£${savings})\n`;
      } else {
        purchaseLines += `${receiptLine}\n`;
      }
    }
    return purchaseLines;
  }

  sendReceiptViaSMS() {
    const randomValue = this.generateRandomValue();
    const deliveryTime = this.generateRandomDeliveryTime();
    const message = `Hey there, thank you for choosing Bob's Bagels.\nYour order is ${randomValue}.\nPlease pick up your order in ${deliveryTime} minutes!\nHere is your receipt: ${this.getReceipt()}`;

    client.messages
      .create({
        body: message,
        from: '+12178338475',
        to: '+351912121304',
      })
      .then(message => console.log(message.sid))
      .done();
  }

  generateRandomValue() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomValue = '';
    for (let i = 0; i < 5; i++) {
      randomValue += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomValue;
  }

  generateRandomDeliveryTime() {
    const minutes = Math.floor(Math.random() * 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return formattedMinutes;
  }
}

let basket = new Basket(40);
basket.addBagel('BGLO', 4);
basket.addBagel('BGLP', 15);
basket.addBagel('BGLE', 7);
basket.addBagel('COF', 3);
const testReceipt = new Receipt(basket.countBagelsInBasket());
testReceipt.sendReceiptViaSMS();

module.exports = Receipt;
