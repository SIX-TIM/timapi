// Create new TerminalSettings instance
var settings = new timapi.TerminalSettings()	

// ----------------------------CONNECTION----------------------------

//IP address of the terminal.
settings.connectionIPString = "192.168.2.12";

//Port to be used for connection.
// Port list:
// 80 - Standard port for ws:// connection
// 8080 - If ports below 1024 are privileged and cannot be used.
settings.connectionIPPort = 80; 

// ----------------------------COMMIT----------------------------

// If the ECR shall be responsible to perform a commit the following parameter has to be set.
// Otherwise the terminal performs a commit automatically.
settings.autoCommit = false;

// ----------------------------CREATE TERMINAL INSTANCE----------------------------

// Create a terminal instance using the adjusted terminalSettings object
var terminal = new timapi.Terminal(settings);

