/** Asynchronous listener handling terminal events. */

/* Define your own TerminalListener by overwrite all required 
 * methods from the DefaultTerminalListener class
 * which you want to use.
*/
class MyTerminalListener extends timapi.DefaultTerminalListener {

// Overwrite all wanted methods of the DefaultTerminalListener herein

}

/* Then create an instance of your "MyTerminalListener" and add it to
 * your terminal instance.
*/
var myListener = new MyTerminalListener();

terminal.addListener(myListener);


