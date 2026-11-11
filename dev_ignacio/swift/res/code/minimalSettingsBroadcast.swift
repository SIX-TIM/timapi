let settings = try TerminalSettings()
settings.terminalId = "12345678"
settings.connectionMode = .broadcast

let terminal = try Terminal(settings: settings)
