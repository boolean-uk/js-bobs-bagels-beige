As a Bob's Bagels customer,
So I can decide the best bagel for me,
I'd like to check the price of a specific type of bagel.

As a Bob's Bagels customer,
So I can get value for money,
I'd like to know the special offers for a specific type of bagel.

As a Bob's Bagels customer,
So that I can feel like a valued customer,
I'd like to get the special deals whenever they apply.

| Objects | Properties    | Messages                  | Scenario                                | Output                                   |
| :------ | :------------ | :------------------------ | :-------------------------------------- | :--------------------------------------- |
| Basket  | contents      | getTotal()                | There is offer's products in the basket | total sum of basket including offers     |
|         | capacity(num) |                           |                                         |                                          |
|         | price key     |                           |                                         |                                          |
|         |               |                           |                                         |                                          |
| Bagel   | ID            | getPriceOfBagel(SKU @Str) |                                         | price of specific bagel                  |
|         | Price         | getTypeOfBagel(SKU @Str)  |                                         | type of bagel                            |
|         |               | getBagelOffer(SKU @Str)   | The Bagel has offer                     | string line with desctiption of offer    |
|         |               |                           | The Bagel doesn't have offer            | Message: 'This bagel doesn't have offer' |
