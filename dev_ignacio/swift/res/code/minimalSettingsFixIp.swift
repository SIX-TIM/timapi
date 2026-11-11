let settings = try TerminalSettings()
settings.connectionIPString = "192.168.1.10"
settings.connectionMode = .onFixIp

let terminal = try Terminal(settings: settings)
