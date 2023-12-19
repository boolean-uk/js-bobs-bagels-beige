# Part 1

As a Bob's Bagels customer,
So I can get receipt of my order
I'd like to see receipt with list of my ordered bagels (name, quantity, price including offer price)

# Part 2

As a Bob's Bagels customer,
So I can get total sum in my receipt
I'd like to see the total sum of my order on the receipt

| Objects | Properties | Messages          | Scenario | Output                                                           |
| :------ | :--------- | :---------------- | :------- | :--------------------------------------------------------------- |
| Receipt | purchases  | getReceipt()      |          | Receipt of order with all bagels their name, quantity and prices |
|         | date       | getPurchaseList() |          | List of bagels which was in order                                |
|         | total      |                   |          |                                                                  |
