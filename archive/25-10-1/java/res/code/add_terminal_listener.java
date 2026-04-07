/** Asynchronous listener handling terminal events. */
class MyTerminalListener extends com.six.DefaultTerminalListener {

/* Overwrite all required methods from the DefaultTerminalListener class
 * herein which you want to use.
*/
}

// Create a new instance of the implemented MyTerminalListener
// class which then can be added to existing terminal object to handle
// the events that you've implemented.
terminal.addListener(new MyTerminalListener());

