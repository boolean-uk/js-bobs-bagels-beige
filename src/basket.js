const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')
const getTotal = require('./getTotal.js')

class Basket {
  constructor(number = 3) {
    this.contents = []
    this.capacity = number
  }

  // General
  basketIsFull() {
    if (this.getQuantityOfBasket() >= this.capacity) {
      return 'basket is full'
    }
    return false
  }

  getPriceOfBagel(SKU) {
    const output = new Bagel(SKU)
    return output.price
  }

  getQuantityOfBasket() {
    return this.contents.map((item) => item.quantity).reduce((a, b) => a + b, 0)
  }

  getBagelOffer(SKU) {
    return new Bagel(SKU).offer
  }

  // AddBagel
  addBagel(SKU, numOfBagels = 1) {
    const findBagel = this.contents.find((item) => item.SKU === SKU) || null

    while (numOfBagels > this.capacity) {
      numOfBagels--
    }

    if (!this.basketIsFull()) {
      if (findBagel) {
        findBagel.quantity += numOfBagels

        return this.contents
      }

      this.contents.push(new Bagel(SKU, this.contents.length + 1, numOfBagels))
    }

    return this.contents
  }

  // RemoveBagel
  removeBagel(id) {
    const findItem = this.contents.find((item) => item.id === id) || null

    if (findItem) {
      this.contents = this.contents.filter((item) => item.id !== id)

      return this.contents
    }

    return "Bagel isn't in basket"
  }

  // ChangeCapacity
  changeCapacity(cap) {
    this.capacity = cap
    return this.capacity
  }

  // getTotal

  getTotal() {
    return getTotal(this.contents)
  }

  // SubTotal
  static getSubtotal(bagelsList, SKU) {
    const count = bagelsList.find((item) => item.SKU === SKU).quantity
    const dealQuantity = deals[SKU][0]
    const dealPrice = deals[SKU][1]
    const bagelPrice = Bagel.getPriceOfBagel(SKU)
    const dealSum = Math.floor(count / dealQuantity) * dealPrice
    const nonDealSum = (count % dealQuantity) * bagelPrice
    return Number((dealSum + nonDealSum).toFixed(2))
  }
}

module.exports = Basket
