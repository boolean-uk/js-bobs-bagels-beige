const deals = require("../src/deals.js");

const inventory = [
  {
    sku: "BGLO",
    price: "0.49",
    name: "Bagel",
    variant: "Onion",
  },
  {
    sku: "BGLP",
    price: "0.39",
    name: "Bagel",
    variant: "Plain",
  },
  {
    sku: "BGLE",
    price: "0.49",
    name: "Bagel",
    variant: "Everything",
  },
  {
    sku: "BGLS",
    price: "0.49",
    name: "Bagel",
    variant: "Sesame",
  },
  {
    sku: "COF",
    price: "0.99",
    name: "Bagel",
    variant: "",
  },
  {
    sku: "BGSE",
    price: "2.99",
    name: "Bagel Sandwich",
    variant: "Everything",
    fillings: ["Bacon", "Egg", "Cheese"],
  },
  {
    sku: "BGSS",
    price: "4.99",
    name: "Bagel Sandwich",
    variant: "Sesame",
    fillings: ["Cream Cheese", "Smoked Salmon"],
  },
];

function findBySku(sku) {
  return inventory.find((bagel) => bagel["sku"] === sku);
}

//TODO: rename Bagel to Item or smth more generic
class Bagel {
  constructor(sku) {
    this.sku = sku;
    this.type = findBySku(sku).variant;
    this.price = findBySku(sku).price;
    this.quantity = 1;
    this.offer =
      sku === "COF"
        ? "buy a coffee and plain bagel for 1.25"
        : `${deals[sku.toLowerCase()].quantityRequired} ${this.type} Bagels for ${deals[sku.toLowerCase()].dealPrice}`;
    
    }

  static getPriceOfBagel(sku) {
    return findBySku(sku).price;
  }

  static getTypeOfBagel(sku) {
    return findBySku(sku).variant;
  }

  getSubtotal () {
    return this.quantity * this.price
  }

  setQuantity (amount) {
    if (amount > 0) {
      this.quantity = amount
    } else {
      throw new Error("Quantity has to be bigger than zero!")
    }
  }
}

module.exports = { Bagel, findBySku };
