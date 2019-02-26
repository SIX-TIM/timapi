// Create settings with IP-address and port of terminal to connect to
let settings = new timapi.TerminalSettings();
settings.connectionIPString = "192.168.1.10";
settings.connectionIPPort = 80;

// Add wanted guides (with bitwise or)
settings.guides.add(timapi.constants.Guides.hospitality);

// Create terminal
let terminal = new timapi.Terminal(settings);

//...

// Disconnect from terminal and clean up properly
terminal.dispose();