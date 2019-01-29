// Set the TIM API internal logging level
Logger.getLogger(terminal.getLoggerName()).setLevel(Level.ALL);

// Set the logging level of the different handlers that have been added to the logger
Handler[] handlers = Logger.getLogger(terminal.getLoggerName()).getHandlers();

for (Handler handler : handlers){
    handler.setLevel(Level.FINEST);
}

// To add a special handler to the TIM API logger
Logger.getLogger(terminal.getLoggerName()).addHandler(myHandler);
