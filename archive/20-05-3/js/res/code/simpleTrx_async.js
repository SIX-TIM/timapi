exampleEcr = {};

// Create a customized listener-class extending the DefaultTerminalListener
class mylistener extends timapi.DefaultTerminalListener {
 terminalStatusChanged(terminal) {
  super.terminalStatusChanged(event, data);
  // Do Stuff
 }

 transactionCompleted(event, data){
  super.transactionCompleted(event, data);
  //Do Stuff
 }
}

function initTimApi(){

 // Define all required settings
 let settings = new timapi.TerminalSettings()

 // Minimal settings
 settings.connectionIPString = "192.168.1.10";
 settings.connectionIPPort = 80;

 settings.autoCommit = false;
 
 // The integrator id is provided by SIX Payment Services / Worldline
 // to identify the integrator for support purposes.
 settings.integratorId = "0e6b1705-ab96-455b-9ba3-a77dd919d7a5";

 // Create terminal object with 
 exampleEcr.terminal = new timapi.Terminal(settings);
 exampleEcr.terminal.setPosId("ECR-01");
 exampleEcr.terminal.setUserId(1);

 exampleEcr.terminal.addListener(new myListener());
}

//A standard purchase transaction can be implemented as follows
function purchase(amount, currency) {
 try {
  // Prepare a timapi amount object for the current transaction
  let myAmount  = new timapi.Amount(amount, currency);

  // Perform the purchase transaction
  terminal.transactionAsync(timapi.constants.TransactionType.purchase, myAmount);
 } catch( err ) {
  console.Log("Error:", err);
 }
}

//To finalize a transaction and if AutoCommit = false,
//the commit function must be used. An implementation could
//look as follows.
function commit() {
 try {
  // Perform the commit
  terminal.commitAsync();
 } catch( err ) {
  console.Log("Error:", err);
 }
}
