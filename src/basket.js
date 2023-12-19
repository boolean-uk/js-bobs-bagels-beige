const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')

class Basket {
  constructor(number = 3) {
    this.contents = []
    this.IDcounter = 0
    this.capacity = number
    this.counts = {}
  }

  addBagel(sku, numOfBagels = 1) {
    for (let i = 0; i < numOfBagels; i++) {
      if (!this.basketIsFull()) {
        this.IDcounter++
        const id = this.IDcounter
        const bagelItem = new Bagel(sku, id)
        this.contents.push(bagelItem)
      }
    }
    return this.contents
  }

  removeBagel(id) {
    for (let i = 0; i < this.contents.length; i++) {
      if (this.contents[i].id === id) {
        this.contents.splice([i], 1)
        return this.contents
      }
    }
    return "Bagel isn't in basket"
  }

  basketIsFull() {
    if (this.contents.length >= this.capacity) {
      return 'basket is full'
    }
    return false
  }

  getPriceOfBagel(sku) {
    const output = new Bagel(sku)
    return output.price
  }

  countBagelsInBasket() {
    this.counts = {}
    for (let i = 0; i < this.contents.length; i++) {
      const sku = this.contents[i].sku
      if (!Object.prototype.hasOwnProperty.call(this.counts, sku)) {
        this.counts[`${sku}`] = 1
      } else {
        this.counts[`${sku}`]++
      }
    }
    return this.counts
  }

  static getSubtotal(counts, sku) {
    const count = counts[sku]
    const dealQuantity = deals[sku][0]
    const dealPrice = deals[sku][1]
    const bagelPrice = Bagel.getPriceOfBagel(sku)
    const dealSum = Math.floor(count / dealQuantity) * dealPrice
    const nonDealSum = (count % dealQuantity) * bagelPrice
    return Number((dealSum + nonDealSum).toFixed(2))
  }

  getTotal() {
    const counts = this.counts
    let total = 0
    for (const sku in counts) {
      const count = counts[`${sku}`]
      const dealQuantity = deals[sku][0]
      const dealPrice = deals[sku][1]
      const bagelPrice = Bagel.getPriceOfBagel(sku)
      if (Object.prototype.hasOwnProperty.call(deals, sku)) {
        const dealSum = Math.floor(count / dealQuantity) * dealPrice
        const nonDealSum = (count % dealQuantity) * bagelPrice
        total += dealSum + nonDealSum
      }
      if (dealQuantity === 1) {
        // adhoc application of coffee deal saving
        const BOGOFSKU = `${deals[sku][2]}`
        const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
        const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[sku][3]
        total -= numOfDiscounts * saving
      }
    }
    return Number(total.toFixed(2))
  }
}

module.exports = Basket
