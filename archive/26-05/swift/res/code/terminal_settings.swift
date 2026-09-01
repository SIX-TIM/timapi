// Create settings with Terminal-ID of terminal to connect to
let terminalSettings = try TerminalSettings()
terminalSettings.terminalId = "12345678"

// add wanted guides (with insert)
terminalSettings.guides.insert(CGuides.retail)
terminalSettings.guides.insert(CGuides.hospitality)

// Create terminal
var terminal = try Terminal(settings: terminalSettings)

//...

// Disconnect from terminal and clean up properly
terminal.dispose()