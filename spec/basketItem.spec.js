const BasketItem = require("../src/basketItem.js");
const { Bagel } = require("../src/bagel.js");

describe("BasketItem", () => {
  beforeEach(() => {
    const myBagel = new Bagel("BGLO", 1)
    const myBasketBagel = new BasketItem("BGLO")
  })

  it("can be created if sku is valid", () => {
    expect(myBasketBagel.sku).toEqual(myBagel.sku)
    expect(myBasketBagel.quantity).toEqual(1)
    expect(myBasketBagel.price).toEqual(myBagel.price)
  })

  it("returns proper subtotal", () => {
    expect(myBasketBagel.getSubtotal()).toEqual(Number(myBagel.price))
  })
})