const deals = require('../src/deals.js')
const { inventory } = require('../inventory.json')

function findBySKU (SKU) {
  return inventory.find((bagel) => bagel.sku === SKU)
}

class Bagel {
  constructor (SKU, id) {
    this.id = id
    this.SKU = SKU
    this.type = findBySKU(SKU).variant
    this.price = findBySKU(SKU).price
    this.offer =
      SKU === 'COF'
        ? 'buy a coffee and plain bagel for 1.25'
        : `${deals[SKU][0]} ${this.type} Bagels for ${deals[SKU][1]}`
  }

  static getPriceOfBagel (SKU) {
    return findBySKU(SKU).price
  }

  static getTypeOfBagel (SKU) {
    return findBySKU(SKU).variant
  }
}

module.exports = Bagel
