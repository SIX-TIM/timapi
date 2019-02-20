/* These completed functions have to be implemented in your "MyTerminalListener"
 * class to overwrite the default implementation.
 * You decide which functions you want to use.
*/
class MyTerminalListener extends timapi.DefaultTerminalListener {

transactionCompleted(event, data){
  super.transactionCompleted(event, data);

/*--- Check transaction outcome ---------------------------------------*/

  // Check if transaction has been successful
  if (event.exception === undefined)
  {
    console.log("Transaction was performed successfully!");

/*--- Print data ------------------------------------------------------*/

    // Further information can be retrieved as the transaction has be successful

    // Get print data which contains a list of receipts
    if (data !== undefined && data.printData !== undefined){
      var myPrintData = data.printData;

      // Go through all available receipts and print them accordingly
      if(myPrintData.receipts !== undefined){
      var myReceipts = myPrintData.receipts;

      // If you want to differ bewteen merchant and cardholder receipt
      for (var i = 0; i < myReceipts.length; i++) {
      // Get merchant receipt
      if(myReceipts[i].recipient == timapi.constants.Recipient.merchant){
	console.log("Merchant receipt: ", myReceipts[i].value);
      }
      // Get cardholder receipt
      if(myReceipts[i].recipient == timapi.constants.Recipient.cardholder){
	console.log("Cardholder receipt: ", myReceipts[i].value);
      }
      }
    }

/*--- Card data -------------------------------------------------------*/

    // Get CardData which contains all available card information
    if (data.cardData !== undefined){
      var myCardData = data.cardData;

      // Further card information can be retrieved out of the CardData object
      // e.g. AID or BrandName etc...
      var aid = myCardData.aid;
      var brandName = myCardData.brandName;
    }
/*--- Further transaction information ---------------------------------*/

    // Further transaction information is available in the TransactionInformation object
    if (data.transactionInformation !== undefined){
      var myTrxInfo = data.transactionInformation;

      // This object contains e.g. acquirer id or transaction reference and more information..
      var acqId = myTrxInfo.acqId;
      var acqTransRef = myTrxInfo.acqTransRef; // If available
      var trmTransRef = myTrxInfo.trmTransRef;

    }

/*---------------------------------------------------------------------*/
  }

  // If the transaction has not been successful the result code can
  // be retrieved as follows to determine what went wrong
  else
  {
    console.log("Transaction was NOT performed successfully:", 
    event.exception.resultCode);
  }
 }
}

