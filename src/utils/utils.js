const inventory = require("../inventory.js");

module.exports.findBySKU = (SKU) => {
  return inventory.find((bagel) => bagel["sku"] === SKU);
};
