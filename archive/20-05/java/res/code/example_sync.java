package simpletransaction;

import com.six.timapi.Terminal;
import com.six.timapi.TerminalSettings;
import com.six.timapi.TimException;
import com.six.timapi.constants.TransactionType;
import com.six.timapi.Amount;
import com.six.timapi.Receipt;
import com.six.timapi.constants.Currency;
import com.six.timapi.TransactionResponse;

import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SimpleTransaction {

    public static void main(String[] args) {

        // Create initial terminal settings
        TerminalSettings settings = new TerminalSettings();

        // Define terminal ID for default connection mode BROADCAST
        settings.setTerminalId("12345678");

        // Define log directory
        settings.setLogDir("C:\\Temp");

        // Create new terminal
        Terminal terminal = new Terminal(settings);

        // The logging level can be adjusted as follows, after the terminal object has been created.
        // The standard Java logging levels are valid
        Logger.getLogger(terminal.getLoggerName()).setLevel(Level.ALL);

        // By default, the logger has a FileHandler for logging into a file. The logging level that shall be
        // used for the file logging can be adjusted as follows.
        for (Handler handler : Logger.getLogger(terminal.getLoggerName()).getHandlers())
        {
            handler.setLevel(Level.FINEST);
        }

        try{
            // Start transaction. Automatically connects to and activates the terminal
            TransactionResponse trxResponse = terminal.transaction(TransactionType.PURCHASE, new Amount( 14.00,
            Currency.CHF));

            // If successful
            System.out.println("Transaction successful");

            // Both cardholder and merchant receipt are returned
            for(Receipt receipt : trxResponse.getPrintData().getReceipts()) {
                System.out.println(receipt.getRecipient() + receipt.getValue());
            }
        }

        catch (TimException te) {
            System.out.println("Transaction failed, exception: " + te.toString() );
        }

        catch (Exception se) {
            System.out.println("Systemexception: " + se.getMessage());
        }
    }
}
