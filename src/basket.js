const Bagel = require('../src/bagel.js')
const deals = require('../src/deals.js')

class Basket {
  constructor(capacity = 3) {
    this.contents = []
    this.IDcounter = 0
    this.capacity = capacity
    this.count = 0
  }

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
      throw new Error('Basket is full!')
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
    return !!foundItemBySku
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

  isFull() {
    if (this.setBagelCount() >= this.capacity) {
      return true
    }
    return false
  }

  getPriceOfBagel(sku) {
    const output = new Bagel(sku)
    return output.price
  }

  setBagelCount() {
    this.count = 0
    for (let i = 0; i < this.contents.length; i++) {
      this.count += this.contents[i].quantity
    }
    return this.count
  }

  includesDeal(item) {
    return !!item.offer
  }

  // getDealInfo(sku) {
  //   const lowerCaseSku = sku.toLowerCase()
  //   const dealQuantity = deals[lowerCaseSku].quantityRequired
  //   const dealPrice = deals[lowerCaseSku].dealPrice
  //   return { dealQuantity, dealPrice }
  // }

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

  getSubtotalWithDeals(item, deal) {
    const dealQuantity = deal.quantityRequired
    const dealPrice = deal.dealPrice
    const bagelPrice = item.price
    const bagelQuantity = item.quantity

    if (dealQuantity > bagelQuantity) {
      return item.quantity * item.price
    }
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

    // where we learnt of the differences between shallow and deep copies, and that we seriously had no clue what was going on until we sort of did.
    const queue = JSON.parse(JSON.stringify(this.contents))

    // processes the items which have deals on them
    for (const key in deals) {
      const queueItem = queue.find((i) => {
        return i.sku === deals[key].itemSku
      })
      if (!queueItem) continue
      total += this.getSubtotalWithDeals(queueItem, deals[key])

      const index = queue.indexOf(queueItem)
      queue.splice(index, 1)
    }

    // processes items which are of a variant which has NO DEAL attached to them
    queue.forEach((item) => {
      total += Number(item.price * item.quantity)
    })
    return Number(total.toFixed(2))
  }
}

module.exports = Basket
