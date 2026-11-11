let logger = Logger.getLogger(name: Terminal.loggerNameModule)
logger.logLevel = .finest
logger.handlers.append(LogHandlerConsole(logLevel: .finest))
logger.handlers.append(LogHandlerFile(logLevel: .finest))
