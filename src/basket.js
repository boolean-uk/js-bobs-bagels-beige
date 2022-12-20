const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')

class Basket {
  constructor (number = 3) {
    this.contents = []
    this.IDcounter = 0
    this.capacity = number
    this.counts = {}
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

  /*
    getTotal() {
        let total = 0
        this.checkDeals()
        console.log(this.countBagelsinBasket())
      for (let i = 0; i < this.contents.length; i++) {
         total += this.contents[i].price * 100
      }
     return total/100
    }
*/
  countBagelsInBasket () {
    this.counts = {}
    this.contents.forEach(item => {
      if (!Object.hasOwnProperty.call(this.counts, item.SKU)) {
        this.counts[item.SKU] = 1
      } else {
        this.counts[item.SKU]++
      }
    })
    return this.counts
  }

  static getSubtotal (counts, SKU) {
    const count = counts[SKU]
    const dealQuantity = deals[SKU][0]
    const dealPrice = deals[SKU][1]
    const bagelPrice = Bagel.getPriceOfBagel(SKU)
    const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
    const nonDealSum = (count % dealQuantity) * (bagelPrice)
    return Number((dealSum + nonDealSum).toFixed(2))
  }

  getTotal () {
    let total = 0
    for (const SKU in this.counts) {
      const count = this.counts[SKU]
      const dealQuantity = deals[SKU][0]
      const dealPrice = deals[SKU][1]
      const bagelPrice = Bagel.getPriceOfBagel(SKU)
      if (Object.hasOwnProperty.call(deals, SKU)) {
        const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
        const nonDealSum = (count % dealQuantity) * (bagelPrice)
        total += dealSum + nonDealSum
      }
      if (dealQuantity === 1) { // adhoc application of coffee deal saving
        const BOGOFSKU = `${deals[SKU][2]}`
        const numOfDiscounts = this.counts[BOGOFSKU] % deals[BOGOFSKU][0]
        const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
        total -= numOfDiscounts * saving
      }
    }
    return Number(total.toFixed(2))
  }

  /* this.contents.filter()
        for(let i = 0; i < this.contents.length; i++){
            for (let j = 0; j < )
        }
    }
    */
}

module.exports = Basket
