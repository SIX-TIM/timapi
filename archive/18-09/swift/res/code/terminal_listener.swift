//
// Handle asynchronous terminal events.
//
class TerminalHandler: DefaultTerminalListener {

    //
    // The status of the terminal changed. This includes processing status and display content
    //
    override func terminalStatusChanged(terminal: Terminal) {
        // Events usually originate from a different thread than the main thread.
        // Always use DispatchQueue.main.async to be safe
        DispatchQueue.main.async {
            // handle terminal status change
        }
    }

    //
    // A call to Terminal.transactionAsync finished.
    //
    override func transactionCompleted(event: TimEvent, data: TransactionResponse?) {
        // Events usually originate from a different thread than the main thread.
        // Always use DispatchQueue.main.async to be safe
        DispatchQueue.main.async {
            // handle transaction finished using data
        }
    }
}