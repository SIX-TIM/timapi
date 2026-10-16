package simpletransaction;

import com.six.timapi.Terminal;
import com.six.timapi.TerminalSettings;
import com.six.timapi.constants.TransactionType;
import com.six.timapi.Amount;
import com.six.timapi.constants.Currency;

public class SimpleTransaction {

    public static void main(String[] args) {

	// Create initial terminal settings
	TerminalSettings settings = new TerminalSettings();

	// Set the IntegratorId that has been provided to you by Worldline
	settings.setIntegratorId("0e6b1705-ab96-455b-9ba3-a77dd919d7a5");

	// Create new terminal
	Terminal terminal = new Terminal(settings);

	// Add all listeners to the terminal which you want to listen to
	terminal.addListener(TerminalListener myTerminalListener);

	// Check if the terminal is ready to receive a transaction
	if(terminal.getTerminalStatus().getTransactionStatus() == TransactionStatus.IDLE)
	{
		// Start transaction. Automatically connects to, loggs in and activates the terminal
		terminal.transactionAsync(TransactionType.PURCHASE, new Amount( 14.00,
		Currency.CHF));
	}
}
