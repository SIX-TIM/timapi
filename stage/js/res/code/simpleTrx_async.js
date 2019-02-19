function initTimApi(){
 exampleEcr = this;

 // Define all required settings
 var settings = new timapi.TerminalSettings()

 // Minimal settings
 settings.connectionIPString = "10.48.198.250";
 settings.connectionIPPort = 80;

 settings.autoCommit = false;
 
 // The integrator id is provided by SIX Payment Services / Worldline
 // to indentify the integrator for support purposes.
 settings.integratorId = "0e6b1705-ab96-455b-9ba3-a77dd919d7a5";

 // Create terminal object with 
 exampleEcr.terminal = new timapi.Terminal(settings);
 exampleEcr.terminal.posId = "ECR-01";
 exampleEcr.terminal.userId = 1;

 class mylistener = new timapi.DefaultTerminalListener(){
   terminalStatusChanged(event, data) {
    super.terminalStatusChanged(event, data);
    // Do Stuff
   }

   transactionCompleted(event, data){
    super.transactionCompleted(event, data);
    //Do Stuff
   }
 }

 exampleEcr.terminal.addListener(myListener);
}

//A standard purchase transaction can be implemented as follows
function purchase(amount, currency, exponent) {
 try {
  // Prepare an timapi amount object for the current transaction 
  var myAmount  = new timapi.Amount(amount, currency, exponent);

  // Perform the purchase transaction
  terminal.transactionAsync(timapi.constants.TransactionType.purchase, myAmount);
 } catch( err ) {
  console.Log("Error:\n" + err);
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
  console.Log("Error:\n" + err);
 }
}
