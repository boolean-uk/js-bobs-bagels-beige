const { findBySku } = require("./bagel.js")

class BasketItem {
  constructor (sku) {
    const bagelTemplate = findBySku(sku)
    this.sku = bagelTemplate.sku
    this.price = bagelTemplate.price
    this.quantity = 1
  }

  getSubtotal () {
    return this.quantity * this.price
  }
}

module.exports = BasketItem