const BasketItem = require("../src/basketItem.js");
const { Bagel } = require("../src/bagel.js");

describe("BasketItem", () => {
  it("can be created if sku is valid", () => {
    const myBagel = new Bagel("BGLO", 1)
    const myBasketBagel = new BasketItem("BGLO")
    expect(myBasketBagel.sku).toEqual(myBagel.sku)
    expect(myBasketBagel.quantity).toEqual(1)
    expect(myBasketBagel.price).toEqual(myBagel.price)
  })
})