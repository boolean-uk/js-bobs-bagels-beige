const Bagel = require('./bagel')
const deals = require('./deals')

const getTotal = (list) => {
  let total = 0

  list.forEach((item) => {
    const count = item.quantity
    const dealQuantity = deals[item.SKU][0]
    const dealPrice = deals[item.SKU][1]
    const bagelPrice = Bagel.getPriceOfBagel(item.SKU)

    if (deals.hasOwnProperty(item.SKU)) {
      const dealSum = Math.floor(count / dealQuantity) * dealPrice
      const nonDealSum = (count % dealQuantity) * bagelPrice

      total += dealSum + nonDealSum
    }

    if (dealQuantity === 1) {
      const BOGOFSKU = `${deals[item.SKU][2]}`
      const ItemQuantity = list.find((item) => item.SKU === BOGOFSKU).quantity
      const numOfDiscounts = ItemQuantity % deals[BOGOFSKU][0]
      const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[item.SKU][3]

      total -= numOfDiscounts * saving
    }
  })

  return Number(total.toFixed(2))
}

module.exports = getTotal
