# Domain Model

## Part 1

DONE - As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

DONE - As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

## Part 2

DONE -As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

DONE - As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket.

## Part 3

As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket

Objects: Basket, Bagel
Properties: Capacity, ID
Verbs: Add, Remove, Know when (is full), Create, Know if (item isn't in basket)

| Objects | Messages          | Input                                     | Scenario                             | Output                                                                                   |
| ------- | ----------------- | ----------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Basket  | addBagel          | sku : string, quantity : number           | valid sku                            | add new Bagel instance to contents, return contents && next ID, ~~increment ID counter~~ |
|         |                   |                                           | invalid sku                          | throw error "sku not found"                                                              |
|         |                   |                                           | full basket                          | throw error "basket full"                                                                |
|         |                   |                                           |                                      |                                                                                          |
|         | removeBagel       | id : number, TODO: quantity : number      | valid sku                            | return contents minus the removed item                                                   |
|         |                   | TODO: make bagels fungible only using sku | invalid sku                          | throw error "sku not found"                                                              |
|         |                   |                                           | TODO: remove more sku than in basket | throw error "cannot remove {inputQuantity}, only {basketQuantity} in basket"             |
|         |                   |                                           |                                      |                                                                                          |
|         | setBasketCapacity | newCapacity : number                      | newCapacity >= 1                     | newCapacity.floor, update capacity, return capacity                                      |
|         |                   |                                           | !(newCapacity >= 1)                  | throw error "newCapacity must be at least 1"                                             |
|         |                   |                                           |                                      |                                                                                          |
|         | getTotal          |                                           |                                      | return sum of contents.items.price                                                       |
|         |                   |                                           |                                      |                                                                                          |
| Bagel   | getPrice          | sku : string                              | valid sku                            | return bagel.price                                                                       |
|         |                   |                                           | invalid sku                          | throw error "sku not found"                                                              |
|         |                   |                                           |                                      |                                                                                          |
