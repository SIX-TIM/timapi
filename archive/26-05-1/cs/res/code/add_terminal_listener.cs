// Register listeners on all events that you want to be noticed about.
// You can use multiple event handlers to handle individual events differently if required.
// Handlers can be added and removed any time.
terminal.TerminalStatusChanged += new Terminal.TerminalStatusChangedHandler(onTerminalStatusChanged);
terminal.TransactionCompleted += new Terminal.TransactionCompletedEventHandler(onTransactionCompleted);

.
.
.

void onTerminalStatusChanged(object sender, TerminalStatus trmStatus)
{
    // process terminal status (e.g. CardReaderState)
}

void onTransactionCompleted(object sender, Terminal.TransactionCompletedEventArgs transactionCompletedEventArgs)
{
    // process transaction response
}