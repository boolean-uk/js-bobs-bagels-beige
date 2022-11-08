const inventory = require("../inventory.js");
console.log(inventory);

module.exports.findBySKU = (SKU) => {
  return inventory.find((bagel) => bagel["sku"] === SKU);
};
