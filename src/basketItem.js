import Bagel from "./bagel"

class BasketItem {
  constructor (sku) {
    this = new Bagel(sku)
    this.quantity = 1
  }

  addQuantity (increase) {
    if (increase < 0 && -this.quantity < increase) {
      throw new Error(`Can't remove ${increase} when only ${this.quantity} are present`)
    } else if (increase < 0 && -this.quantity === increase) {
      throw new Error('Seems like you want to remove the item from the basket.')
    }
    this.quantity += increase
    return this
  } 
}

export default BasketItem