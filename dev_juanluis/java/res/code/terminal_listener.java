/** Asynchronous listener handling terminal events. */
class TerminalHandler extends com.six.DefaultTerminalListener {

    /** Terminal status change which can be the display content or an operational state. */
    @Override
    public void terminalStatusChanged(final Terminal terminal) {
        // Events usually originate from a different thread than the main thread.
        // Always use SwingUtilities.invokeLater to be safe
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                logger.info("Terminal status changed");
            }
        });
    }

    /** Transaction request completed either successfully or with a failure. */
    @Override
    public void transactionCompleted(com.six.TimEvent event, final com.six.TransactionResponse data) {
        // Always super-call transactionCompleted(). This ensures requestCompleted() and
        // printReceipts() are properly called. You can do you own processing before or
        // after the super-call depending on your needs.
        super.transactionCompleted(event, data);
        // Events usually originate from a different thread than the main thread.
        // Always use SwingUtilities.invokeLater to be safe
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                // handle transaction finished using data
            }
        });
    }
}

// Create settings with Terminal-ID of terminal to connect to
com.six.TerminalSettings settings = new com.six.TerminalSettings();
settings.setTerminalId("12345678");

// Create terminal
com.six.Terminal terminal = new com.six.Terminal(settings);

// Add listener to handle events
terminal.addListener(new TerminalHandler());

// Run transaction
terminal.transactionAsync(com.six.constants.TransactionType.PURCHASE,
    new com.six.Amount(8.5, com.six.constants.Currency.CHF));

// Once the transaction completes TerminalHandler.transactionCompleted will be called
// TerminalHandler.terminalStatusChanged will be called after every status change