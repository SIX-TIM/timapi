package simpletransaction;

import com.six.timapi.Terminal;
import com.six.timapi.TerminalSettings;
import com.six.timapi.TimException;
import com.six.timapi.constants.TransactionType;
import com.six.timapi.Amount;
import com.six.timapi.Receipt;
import com.six.timapi.constants.Currency;
import com.six.timapi.TransactionResponse;

public class SimpleTransaction {

    public static void main(String[] args) {

        // Create initial terminal settings
        TerminalSettings settings = new TerminalSettings();

        // Define terminal ID for default connection mode BROADCAST
        settings.setTerminalId("12345678");

        // Create new terminal
        Terminal terminal = new Terminal(settings);

        try{
            // Start transaction. Automatically connects to, loggs in and activates the terminal
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
