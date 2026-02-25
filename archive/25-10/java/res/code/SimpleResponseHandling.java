// These completed functions have to be implemented in your "MyTerminalListener"
// class to overwrite the standard implementation.

/** Transaction request completed either successfully or with a failure. */
@Override
public void transactionCompleted(TimEvent event, final TransactionResponse data) {
// Always super-call transactionCompleted(). This ensures requestCompleted() and
// printReceipts() are properly called. You can do you own processing before or
// after the super-call depending on your needs.
super.transactionCompleted(event, data);

TimEvent myEvent = event;

  // Events usually originate from a different thread than the main thread.
  // Always use SwingUtilities.invokeLater to be safe
  SwingUtilities.invokeLater(new Runnable() {
  @Override
  public void run() {
      // handle transaction finished using data

/*--- Check transaction outcome ---------------------------------------*/

        // Check if transaction has been successful
        if (myEvent.getException == null)
        {
	  System.out.println("Transaction was performed successfully!");

/*--- Print data ------------------------------------------------------*/

	// Further information can be retrieved as the transaction has be successful
	
	// Get print data which contains a list of receipts
	PrintData myPrintData = data.getPrintData();
	List<Receipt> myReceiptList = myPrintData.getReceipts();

/*--- Card data -------------------------------------------------------*/

	// Get CardData which contains all available card information
	CardData myCardData = data.getCardData();

	// Further card information can be retrieved out of the CardData object
	// e.g. AID or BrandName ...
	String aid = myCardData.getAid();
	String brandName = myCardData.getBrandName();

/*--- Further transaction information ---------------------------------*/
	
	// Further transaction information is available in the TransactionInformation object
	TransactionInformation myTrxInfo = data.getTransactionInformation();

	// This object contains e.g. acquirer id or transaction reference and more information..
	String acqId = myTrxInfo.getAcqId();
	String acqTransRef = myTrxInfo.getAcqTransRef(); // If available
	String trmTransRef = myTrxInfo.getTrmTransRef();
	
        }

/*---------------------------------------------------------------------*/

	// If the transaction has not been successful the result code can
	// be retrieved as follows to determine what went wrong
        else
        {
	  System.out.println("Transaction was NOT performed successfully:" + 
	  		     myEvent.getException().getResultCode().toString());
        }
      }
    });
}

