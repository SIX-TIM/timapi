// Create new TerminalSettings instance
TerminalSettings settings = new TerminalSettings();

// ----------------------------LOGGING----------------------------

// Set the Logging directory path where the log file will be saved
// This may lokk different depending on the OS you are using
// UNCOMMENT the section you need

// --------------Example for WINDOWS--------------
// settings.setLogDir("C:\Temp\Logs");

// --------------Example for LINUX/macOS-------------- 
settings.setLogDir("/home/myUser/tmp/logs");



// ----------------------------CONNECTION----------------------------

// If default ConnectionMode = Broadcast is used the following has to be set:
settings.setTerminalId("12345678"); //TerminalId of the terminal that shall be used.



// ----------------------------COMMIT----------------------------

// If the ECR shall be responsible to perform a commit the following parameter has to be set.
// Otherwise the terminal performs a commit automatically.
settings.setAutoCommit = false;



// ----------------------------CREATE TERMINAL INSTANCE----------------------------

// Create a terminal instance using the adjusted terminalSettings object
Terminal terminal = new Terminal(settings);
