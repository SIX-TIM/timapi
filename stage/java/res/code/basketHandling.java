/* Create a TransactionRequest object which can then
 * be sent in a transaction() or transactionAsync()
 * function.
 */
 TransactionRequest request = new TransactionRequest();

 // At least an amount has to be set
 request.setAmount(new Amount(25000, Currency.CHF));

 /* Create a basket object which can then contain
  * a list of BasketItems.
  */
 Basket basket = new Basket();

// Create as many BasketItems as required
BasketItem basketItem = new BasketItem();

basketItem.setItemId("1");
basketItem.setLoyaltyId("32165498752");
basketItem.setAmount(new Amount(1000, Currency.CHF));
basketItem.setItemQuantity(new ItemQuantity(15, 0, "ltr"));
basketItem.setTotalAmount(15000, Currency.CHF);
basketItem.setProdDescription("Diesel");

BasketItem basketItem2 = new BasketItem();

basketItem.setItemId("200");
basketItem.setAmount(new Amount(500, Currency.CHF));
basketItem.setItemQuantity(new ItemQuantity(20, 0, "pcs"));
basketItem.setTotalAmount(10000, Currency.CHF);
basketItem.setProdDescription("Sweets");

// Add the created BasketItems to the Basket
basket.getItems().add(basketItem);
basket.getItems().add(basketItem2);

/* If all required BasketItems have been added to the
 * Basket, the Basket itself can be added the 
 * TransactionRequest.
 */
 request.setBasket(basket);

 // The request can then be used in a transaction
 terminal.transactionAsync(TransactionType.PURCHASE, request);
