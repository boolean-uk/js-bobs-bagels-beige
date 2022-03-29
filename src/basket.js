const Bagel = require("../src/bagel.js");
const deals = require("../src/deals.js");
/**
 * I need to refactor all of this
 * - Function names
 * - Variable names
 * - Create new classes for different Items
 */
class Basket {
    constructor(number = 3) {
        this.contents = []
        this.IDcounter = 0
        this.capacity = number
    }

    addBagel(SKU, numOfBagels = 1) {      
        // Note : 1 bagel is a bagel object, 10 bagels will add
        //        10 items to the array, not an object with a quantity
        for (let i = 0; i < numOfBagels; i++) {
            if (this.basketIsFull()) continue;
            const id = this.IDcounter++;          
            this.contents.push(new Bagel(SKU, id))       
        }
        return this.contents
    }

    removeBagel(id) {
        // This remove function doesn't let us remove a certain quantity
        // of a bagel, it just all the instances of that bagel
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === id) {
                this.contents.splice([i], 1)
                return this.contents
            }
        } return "Bagel isn't in basket"
    }

    basketIsFull() {
        return this.contents.length >= this.capacity ? 'basket is full' : false
    }


    /**
     * TODO: Move this to Inventory.js
     * @param {String} SKU 
     * @returns 
     */
    getPriceOfBagel(SKU) {
        // This function doesn't belong to here
        const output = new Bagel(SKU);
        return output.price
    }



    countBagelsInBasket(){
        const map = new Map();
        this.contents.forEach(item => map.set(item.SKU,(map.get(item.SKU) || 0) + 1));
         return map;
    }

    getSubtotal(count,SKU){
        const dealQuantity = deals[SKU][0]
        const dealPrice = deals[SKU][1]
        const bagelPrice = Bagel.getPriceOfBagel(SKU)
        let dealSum = Math.floor(count / dealQuantity) * (dealPrice)
        const nonDealSum = (count % dealQuantity) * (bagelPrice)
        if (dealQuantity === 1){  //---  adhoc application of coffee deal saving --- (OP's comment))                                                
            const BOGOFSKU = `${deals[SKU][2]}` // Can't figure out what BOGOFSKU stands for
            const numOfDiscounts = this.countBagelsInBasket().get(BOGOFSKU) % deals[BOGOFSKU][0]
            const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
            dealSum -= numOfDiscounts * saving
        }
        return (dealSum + nonDealSum)

    }

    getTotal() {
        const counts = this.countBagelsInBasket()
        let total = 0
        counts.forEach((value, key) => {
            total += this.getSubtotal(value, key)
        })
        return total
    }
        

}


module.exports = Basket