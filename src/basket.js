const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')
const twilio = require('../src/twilioSms.js')

class Basket {
  constructor (number = 3) {
    this.contents = []
    this.IDcounter = 0
    this.capacity = number
    this.counts = {}
    this.contactNumber = ''
    this.receipt = null
  }

  addContactNumber (num) {
    this.contactNumber = num
  }

  addBagel (SKU, numOfBagels = 1) {
    for (let i = 0; i < numOfBagels; i++) {
      if (!this.basketIsFull()) {
        this.IDcounter++
        const id = this.IDcounter
        const bagelItem = new Bagel(SKU, id)
        this.contents.push(bagelItem)
      }
    }
    return this.contents
  }

  removeBagel (id) {
    for (let i = 0; i < this.contents.length; i++) {
      if (this.contents[i].id === id) {
        this.contents.splice([i], 1)
        return this.contents
      }
    } return "Bagel isn't in basket"
  }

  basketIsFull () {
    if (this.contents.length >= this.capacity) {
      return 'basket is full'
    }
    return false
  }

  getPriceOfBagel (SKU) {
    const output = new Bagel(SKU)
    return output.price
  }

  countBagelsInBasket () {
    this.counts = {}
    for (let i = 0; i < this.contents.length; i++) {
      const SKU = this.contents[i].SKU
      if (!this.counts.hasOwnProperty(SKU)) {
        this.counts[`${SKU}`] = 1
      } else {
        this.counts[`${SKU}`]++
      }
    }
    return this.counts
  }

  static getSubtotal (counts, SKU) {
    const count = counts[SKU]
    const dealQuantity = deals[SKU][0]
    const dealPrice = deals[SKU][1]
    const bagelPrice = Bagel.getPriceOfBagel(SKU)
    const totalNoDisc = count * bagelPrice
    const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
    let nonDealBagels = (count % dealQuantity)
    let coffeAndBagelDiscount = 0
    if (SKU === 'BGLP' && counts.hasOwnProperty('COF') && nonDealBagels !== 0) {
      const coffeCount = counts.COF
      coffeAndBagelDiscount = (coffeCount * 0.26)
      nonDealBagels = nonDealBagels - coffeCount
    }
    const nonDealSum = nonDealBagels * bagelPrice
    const result = Number((dealSum + nonDealSum + coffeAndBagelDiscount).toFixed(2))
    const savings = totalNoDisc - result
    return [result, savings]
  }

  getTotal () {
    const counts = this.counts
    let total = 0
    for (const SKU in counts) {
      const count = counts[`${SKU}`]
      const dealQuantity = deals[SKU][0]
      const dealPrice = deals[SKU][1]
      const bagelPrice = Bagel.getPriceOfBagel(SKU)
      if (deals.hasOwnProperty(SKU)) {
        const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
        const nonDealSum = (count % dealQuantity) * (bagelPrice)
        total += dealSum + nonDealSum
      }
      if (dealQuantity === 1) { // adhoc application of coffee deal saving
        const BOGOFSKU = `${deals[SKU][2]}`
        const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
        const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
        total -= numOfDiscounts * saving
      }
    }
    return Number(total.toFixed(2))
  }

  attachReceipt (receipt) {
    this.receipt = receipt
  }

  twilioService () {
    const timer = new Date()
    const deliveryTime = `${timer.getMinutes() > 44 ? (timer.getHours() + 1) % 24 : timer.getHours()}:${(timer.getMinutes() + 15) % 60}`
    twilio(this.receipt, deliveryTime, this.contactNumber)
  }
}

module.exports = Basket
