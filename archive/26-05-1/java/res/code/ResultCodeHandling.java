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

        // Check if transaction has been successful
        if (myEvent.getException == null)
        {
	  System.out.println("Transaction was performed successfully!");
        }

        else
        {
	  System.out.println("Transaction was NOT performed successfully:" + myEvent.getException().getResultCode().toString());
        }
      }
    });
}

