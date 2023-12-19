const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')

class Basket {
  constructor(capacity = 3) {
    this.contents = []
    this.IDcounter = 0
    this.capacity = capacity
    this.count = 0
  }

  // extract a method that updates IDcounter
  // numOfBagels = 1 -> why?, and why there?
  addBagel(sku) {
    if (!sku) {
      throw new Error('no sku passed')
    }
    if (typeof sku !== 'string') {
      throw new Error('invalid sku - should be of type string')
    }
    if (sku.length < 3 || sku.length > 4) {
      throw new Error('invalid sku - should contain 3 or 4 characters')
    }
    if (sku.toUpperCase() !== sku) {
      throw new Error('invalid sku - should be capitalised')
    }

    if (this.isFull()) {
      throw new Error("Basket is full!")
    }

    if (this.contains(sku)) {
      const foundItem = this.contents.find((i) => i.sku === sku)
      foundItem.setQuantity(foundItem.quantity + 1)
      return this.contents
    }

    const bagelItem = new Bagel(sku)
    this.contents.push(bagelItem)
    
    return this.contents
  }

  contains(sku) {
    const foundItemBySku = this.contents.find((i) => i.sku === sku)
    return !foundItemBySku ? false : true
  }

  removeBagel(sku) {
    const foundItemBySku = this.contents.find((i) => i.sku === sku)

    if (!foundItemBySku) {
      throw new Error('bagel not found')
    }

    for (let i = 0; i < this.contents.length; i++) {
      if (foundItemBySku) {
        this.contents.splice([i], 1)
        return this.contents
      }
    }
  }

  // returns a boolean or a string - should return only one data type
  isFull() {
    if (this.setBagelCount() >= this.capacity) {
      return true
    }
    return false
  }

  // output: variable name unclear (bagel1 would be better)
  getPriceOfBagel(sku) {
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
  setBagelCount() {
    this.count = 0
    for (let i = 0; i < this.contents.length; i++) {
      this.count += this.contents[i].quantity
    }
    return this.count
  }

  getDealInfo(sku) {
    const lowerCaseSku = sku.toLowerCase()
    const dealQuantity = deals[lowerCaseSku].quantityRequired
    const dealPrice = deals[lowerCaseSku].dealPrice
    return { dealQuantity, dealPrice }
  }

  getTotalDealsPrice(bagelQuantity, dealQuantity, dealPrice) {
    const sum = Math.floor(bagelQuantity / dealQuantity) * dealPrice
    return sum
  }

  getTotalPriceOfItemsNotIncludedInDeals(
    bagelQuantity,
    dealQuantity,
    bagelPrice
  ) {
    const sum = (bagelQuantity % dealQuantity) * bagelPrice
    return sum
  }

  getSubtotalWithDeals(item) {
    const { dealQuantity, dealPrice } = this.getDealInfo(item.sku)

    const bagelPrice = Bagel.getPriceOfBagel(item.sku)
    // DUMMY DATA, TO BE REPLACE WITH Bagel.getQuantity(sku)
    const bagelQuantity = item.quantity

    const totalDealPrice = this.getTotalDealsPrice(
      bagelQuantity,
      dealQuantity,
      dealPrice
    )
    const totalPriceNotIncludedInDeals =
      this.getTotalPriceOfItemsNotIncludedInDeals(
        bagelQuantity,
        dealQuantity,
        bagelPrice
      )

    const totalSum = Number(
      (totalDealPrice + totalPriceNotIncludedInDeals).toFixed(2)
    )

    return totalSum
  }

  getTotal() {
    let total = 0
    // this will work once bagels have a quantity property and each type only appears in the this.contents once
    this.contents.forEach((item) => {
      if (item.sku === 'COF') {
        const { dealQuantity, dealPrice } = this.getdealInfo(item)
        const numOfDiscounts = dealQuantity
        const pricePaid = numOfDiscounts * dealPrice
        total += pricePaid
      }
      if (item.sku !== 'COF') {
        total += this.getSubtotalWithDeals(item)
        console.log('ran')
      }
    })

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
