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
        this.counts = {} // what is this ?
    }

    addBagel(SKU, numOfBagels = 1) {      
        // Note : 1 bagel is a bagel object, 10 bagels will add
        //        10 items to the array, not an object with a quantity
        for (let i = 0; i < numOfBagels; i++) {
            if (!this.basketIsFull()) {
            this.IDcounter++                    // This part 
            const id = this.IDcounter           // is a bit of a mess
            let bagelItem = new Bagel(SKU, id)  // A lot of repetition
            this.contents.push(bagelItem)       // Could be reduced
            }
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
        // Can be reduced to 1 line
        if (this.contents.length >= this.capacity) {
           return 'basket is full'
        }
        return false
    }

    getPriceOfBagel(SKU) {
        // This function doesn't belong to here
        const output = new Bagel(SKU);
        return output.price
    }
/* --OP's comment--
    getTotal() {
        let total = 0
        this.checkDeals()
        console.log(this.countBagelsinBasket())
      for (let i = 0; i < this.contents.length; i++) {
         total += this.contents[i].price * 100
      }
     return total/100
    }
*/
    countBagelsInBasket(){
        // This is reseting the counts object on the object level
        // Could just be a function level variable
        // Note : this can be done with a Map instead (?)
        this.counts = {} // <-- This here
        for (let i = 0; i < this.contents.length; i++){
            const SKU = this.contents[i]['SKU']
            if (!this.counts.hasOwnProperty(SKU)) {
                this.counts[`${SKU}`] = 1
            } else {
                this.counts[`${SKU}`]++;
            }
        }
         return this.counts;
    }

    // This function is not needed as its never used
    // Seems like it has been made static for no reason 
    // Maybe it was used in the past
    static getSubtotal(counts,SKU){
        const count = counts[SKU]
        const dealQuantity = deals[SKU][0]
        const dealPrice = deals[SKU][1]
        const bagelPrice = Bagel.getPriceOfBagel(SKU)
        const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
        const nonDealSum = (count % dealQuantity) * (bagelPrice)
        return Number((dealSum + nonDealSum).toFixed(2)) // No

    }

    // Needs refactoring, could reuse the getSubtotal function
    // Since the same code is repeated inside of this function **
    getTotal(){
        const counts = this.counts
        let total = 0
        for (let SKU in counts){
            const count = counts[`${SKU}`]
            const dealQuantity = deals[SKU][0]
            const dealPrice = deals[SKU][1]
            const bagelPrice = Bagel.getPriceOfBagel(SKU)
            if (deals.hasOwnProperty(SKU)){// <-- HERE **
                const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
                const nonDealSum = (count % dealQuantity) * (bagelPrice)
                total += dealSum + nonDealSum
            }
            if (dealQuantity === 1){  //---  adhoc application of coffee deal saving --- (OP's comment))                                                
                const BOGOFSKU = `${deals[SKU][2]}` // Can figure out what BOGOFSKU stands for
                const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
                const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
                total -= numOfDiscounts * saving
            }
        }
        return Number(total.toFixed(2)) // No
    }
        
        
        // --OP's comment--
        /*this.contents.filter()
        for(let i = 0; i < this.contents.length; i++){
            for (let j = 0; j < )
        }
    }
    */

}


module.exports = Basket