// Create new TerminalSettings instance
TerminalSettings settings = new TerminalSettings();

// ----------------------------LOGGING----------------------------

// Set the Logging directory path where the log file will be saved
// This may lokk different depending on the OS you are using
// UNCOMMENT the one section you need

// --------------Example for WINDOWS--------------
// settings.setLogDir("C:\Temp\Logs");

// --------------Example for LINUX/macOS-------------- 
settings.setLogDir("/home/myUser/tmp/logs");



// ----------------------------CONNECTION----------------------------

// If a direct connect shall be made the following parameters have to be set:
settings.setTerminalIp("192.168.2.12"); //IP address of the terminal.
settings.setConnectionMode(ConnectionMode.ON_FIX_IP); // ConnectionMode must be set to ConnectionMode.ON_FIX_IP



// ----------------------------COMMIT----------------------------

// If the ECR shall be responsible to perform a commit the following parameter has to be set.
// Otherwise the terminal performs a commit automatically.
settings.setAutoCommit = false;



// ----------------------------CREATE TERMINAL INSTANCE----------------------------

// Create a terminal instance using the adjusted terminalSettings object
Terminal terminal = new Terminal(settings);
