const deals = require("./deals.js");
const { findBySKU } = require("./utils/utils.js");

class Bagel {
    constructor(SKU, id){
        this.id = id
        this.SKU = SKU
        this.type = findBySKU(SKU).variant
        this.price = findBySKU(SKU).price
        this.offer = this.#calculateOffer(SKU)
    }

    #calculateOffer(SKU) {
      if (SKU === 'COF') {
        return "buy a coffee and plain bagel for 1.25"
      }
      return `${deals[SKU][0]} ${this.type} Bagels for ${deals[SKU][1]}`
    }


  static getPriceOfBagel(SKU) {
    return findBySKU(SKU).price
  }

  static getTypeOfBagel(SKU) {
    return findBySKU(SKU).variant
  }

}

module.exports = {
  Bagel
}