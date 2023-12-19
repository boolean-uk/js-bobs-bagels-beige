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
    name: 'Coffee',
    variant: ''
  },
  {
    sku: 'BGSE',
    price: '2.99',
    name: 'Bagel Sandwich',
    variant: 'Everything',
    fillings: ['Bacon', 'Egg', 'Cheese']
  },
  {
    sku: 'BGSS',
    price: '4.99',
    name: 'Bagel Sandwich',
    variant: 'Sesame',
    fillings: ['Cream Cheese', 'Smoked Salmon']
  }
]

function findBySku(sku) {
  return inventory.find((bagel) => bagel.sku === sku)
}
class Bagel {
  constructor(sku, quantity = 1) {
    const bagel = findBySku(sku)

    this.sku = bagel.sku
    this.variant = bagel.variant
    this.price = bagel.price
    this.name = bagel.name
    this.fillings = bagel.fillings
    this.quantity = quantity
  }

  get details() {
    return {
      sku: this.sku,
      price: this.price,
      name: this.name,
      variant: this.variant,
      quantity: this.quantity
    }
  }

  static getPriceOfBagel(sku) {
    return findBySku(sku).price
  }

  static getTypeOfBagel(sku) {
    return findBySku(sku).variant
  }
}

module.exports = Bagel
