using SIX.TimApi;

// Create settings with Terminal-ID of terminal to connect to
TerminalSettings settings = new TerminalSettings();
settings.TerminalId = "12345678";

// add wanted guides
settings.Guides.Add(Constants.Guides.Hospitality);
settings.Guides.Add(Constants.Guides.Gastro);

// Create terminal
Terminal terminal = new Terminal(settings);

//...

// Disconnect from terminal and clean up properly
terminal.dispose();
