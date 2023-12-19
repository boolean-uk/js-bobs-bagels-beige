const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')

class Basket {
  constructor (number = 3) {
    this.contents = []
    this.IDcounter = 0
    this.capacity = number
    this.counts = {}
  }

  // extract a method that updates IDcounter
  // numOfBagels = 1 -> why?, and why there?
  addBagel (sku, numOfBagels = 1) {
    if(!sku) {
      throw new Error('no sku passed')
    }
    if(typeof sku !== 'string') {
      throw new Error('invalid sku - should be of type string')
    }
    if(sku.length < 3 || sku.length > 4) {
      throw new Error('invalid sku - should contain 3 or 4 characters')
    }
    if(sku.toUpperCase() !== sku) {
      throw new Error('invalid sku - should be capitalised')
    }
 
    for (let i = 0; i < numOfBagels; i++) {
      if (!this.basketIsFull()) {
        this.IDcounter++
        const id = this.IDcounter
        let bagelItem = new Bagel(sku, id)
        this.contents.push(bagelItem)
      }
    }
    return this.contents
  }

  contains(sku) {
    const foundItemBySku = this.contents.find((i) => i.sku === sku)
    return !foundItemBySku ? false : true
  }

  removeBagel (id) {
    const foundItemById = this.contents.find((i) => i.id === id)

    if(!foundItemById) {
      throw new Error("bagel not found")
    }

    for (let i = 0; i < this.contents.length; i++) {
      if (this.contents[i].id === id) {
        this.contents.splice([i], 1)
        return this.contents
      }
    }
  }

  // returns a boolean or a string - should return only one data type
  basketIsFull () {
    if (this.contents.length >= this.capacity) {
      return 'basket is full'
    }
    return false
  }

  // output: variable name unclear (bagel1 would be better)
  getPriceOfBagel (sku) {
    const output = new Bagel(sku)
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
    for (let i = 0; i < this.contents.length; i++) {
      const sku = this.contents[i]['sku']
      if (!this.counts.hasOwnProperty(sku)) {
        this.counts[sku] = 1
      } else {
        this.counts[sku]++
      }
    }
    return this.counts
  }

  static getSubtotal (counts, sku) {
    const count = counts[sku]
    const dealQuantity = deals[sku][0]
    const dealPrice = deals[sku][1]
    const bagelPrice = Bagel.getPriceOfBagel(sku)
    const dealSum = Math.floor(count / dealQuantity) * dealPrice
    const nonDealSum = (count % dealQuantity) * bagelPrice
    return Number((dealSum + nonDealSum).toFixed(2))
  }

  getTotal () {
    const counts = this.counts
    let total = 0
    for (let sku in counts) {
      const count = counts[sku]
      const dealQuantity = deals[sku][0]
      const dealPrice = deals[sku][1]
      const bagelPrice = Bagel.getPriceOfBagel(sku)
      if (deals.hasOwnProperty(sku)) {
        const dealSum = Math.floor(count / dealQuantity) * dealPrice
        const nonDealSum = (count % dealQuantity) * bagelPrice
        total += dealSum + nonDealSum
      }
      if (dealQuantity === 1) {
        // adhoc application of coffee deal saving
        const BOGOFsku = `${deals[sku][2]}`
        const numOfDiscounts = counts[BOGOFsku] % deals[BOGOFsku][0]
        const saving = Bagel.getPriceOfBagel(BOGOFsku) - deals[sku][3]
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
