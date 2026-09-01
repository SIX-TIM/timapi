import com.six.timapi.Terminal;
import com.six.timapi.TerminalSettings;
import com.six.timapi.Amount;
import com.six.timapi.constants.TransactionType;
import com.six.timapi.constants.Currency;

import javax.swing.*;

class ECRSample {
    public static void main(String [] args) {
        // Create terminal settings as described in the example above!
        TerminalSettings trmSettings = new TerminalSettings();

        // Create terminal instance using the communication settings. These settings can
        // not be changed anymore at a later time.
        Terminal terminal = new Terminal(trmSettings);

        // Set properties affecting the next login and transaction process. Changing POS-ID
        // has no effect until the next logout-login. Changing User-ID affects the next
        // transaction initiated
        terminal.setPosId("POS1234");
        terminal.setUserId(12345678);

        // Add the notifiers you wish to handle.
        // It can be done by adding a subclass of six.timap.TerminalNotifier as follows:

        // Add activateCompleted, transactionCompleted, commitCompleted, deactivateCompleted
        // and balanceCompleted notifier if required.
        terminal.addListener(new TerminalListener() {
            @Override
            public void activateCompleted(TimEvent e, ActivateResponse data) {
                // my code to be called if a activate request completed.
            }

            @Override
            public void transactionCompleted(TimEvent e, TransactionResponse data) {
                // my code to be called if a transaction request completed.

                // After the transaction request is completed correctly, a commit can be performed.
                // Only required if AutoCommit is not enabled.
                SwingUtilities.invokeLater(new Runnable() {
                    public void run() {
                        terminal.commitAsync();
                    }
                });
            }

            @Override
            public void commitCompleted(TimEvent e) {
                // my code to be called if a commit request completed.

                // A deactivateAsync() can be called here. This is not required if the option
                // AutoDeactivate is enabled, it will then be performed automatically.
                SwingUtilities.invokeLater(new Runnable() {
                    public void run() {
                        terminal.deactivateAsync()
                    }
                });

                // If AutoDeactivate is enabled, a balanceAsync() can be called directly and a
                // deactivation will be performed automatically.
                SwingUtilities.invokeLater(new Runnable() {
                    public void run() {
                        terminal.balanceAsync()
                    }
                });
            }

            @Override
            public void deactivateCompleted(TimEvent e, DeactivateResponse data) {
                // my code to be called if a deactivate request completed.
            }

            @Override
            public void balanceCompleted(TimEvent e, BalanceResponse data) {
                // my code to be called if a balance request completed.
            }
        });


        // Start a transaction process
        // If the terminal is not yet logged in or activated this two actions are performed
        // automatically before performing the transaction.
        terminal.transactionAsync(TransactionType.PURCHASE, new Amount(12.50, Currency.CHF));

        // If the option AutoCommit is enabled the commitAsync() method is called automatically
        // after the transaction has finished.
        // If not enabled, the commitAsync() method shall be called after receiving the
        // transactionCompleted event.

        // If the commit request is completed correctly the deactivate can be started
        // (see commitCompleted method). If the AutoDeactivate option is enabled a deactivateAsync()
        // is not required to be called. Another request that need a Deactivated state will then
        // perform a deactivateAsync() automatically. Otherwise the deactivateAsync() method can
        // be called after a successful commitCompleted event.

        // So if AutoDeactivate is enabled, a balanceAsync() can be called directly.
        // This can be done e.g. in the commitCompleted event (see commitCompleted event).
    }
}