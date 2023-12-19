# Ex One

As a Bob's Bagels customer,
So I can decide the best bagel for me,
I'd like to check the price of a specific type of bagel.

As a Bob's Bagels customer,
So I can get value for money,
I'd like to know the special offers for a specific type of bagel.

As a Bob's Bagels customer,
So that I can feel like a valued customer,
I'd like to get the special deals whenever they apply.

| Objects | Properties    | Messages       | Messages to messages | Output                                                 |
| :------ | :------------ | :------------- | :------------------- | :----------------------------------------------------- |
| Basket  | contents      | add            | isFull?              | contents + new item with next ID, increment ID counter |
|         | capacity(num) | remove         | containsItemofThisID | contents - the removed item                            |
|         | ID counter    | changeCapacity |                      | number                                                 |
|         | price key     | sumPrices      |                      | function that adds all prices                          |
| Bagel   | ID            | checkPrice     |                      |                                                        |
|         | Price         |                |                      |                                                        |
