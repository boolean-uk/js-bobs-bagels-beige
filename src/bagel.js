const deals = require('../src/deals.js')

// A file with all the inventory already exists
const inventory = [
  {
    sku: 'BGLO',
    price: '0.49',
    name: 'Bagel',
    variant: 'Onion'
  },
  {
    sku: 'BGLP',
    price: '0.39',
    name: 'Bagel',
    variant: 'Plain'
  },
  {
    sku: 'BGLE',
    price: '0.49',
    name: 'Bagel',
    variant: 'Everything'
  },
  {
    sku: 'BGLS',
    price: '0.49',
    name: 'Bagel',
    variant: 'Sesame'
  },
  {
    sku: 'COF',
    price: '0.99',
    name: 'Bagel',
    variant: ''
  },
  {
    sku: 'BGSE',
    price: '2.99',
    name: 'Bagel Sandwich',
    variant: 'Everything',
    fillings: [
      'Bacon',
      'Egg',
      'Cheese'
    ]
  },
  {
    sku: 'BGSS',
    price: '4.99',
    name: 'Bagel Sandwich',
    variant: 'Sesame',
    fillings: [
      'Cream Cheese',
      'Smoked Salmon'
    ]
  }
]
// This should be in another class (Inventory)
function findBySKU (SKU) {
  return inventory.find(bagel => bagel.sku === SKU)
}

class Bagel {
  constructor (SKU, id) {
    this.id = id
    this.SKU = SKU
    this.type = findBySKU(SKU).variant
    this.price = findBySKU(SKU).price
    this.offer = SKU === 'COF' // Hard coded offer
      ? 'buy a coffee and plain bagel for 1.25' // Could be an issue for the future
      : `${deals[SKU][0]} ${this.type} Bagels for ${deals[SKU][1]}`
  }

  static getPriceOfBagel (SKU) {
    return findBySKU(SKU).price // Should return the object's property (this.price)
  }

  static getTypeOfBagel (SKU) {
    return findBySKU(SKU).variant // Should return the object's property (this.type)
  }
}

module.exports = Bagel
