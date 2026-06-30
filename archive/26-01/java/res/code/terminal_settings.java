// Create settings with Terminal-ID of terminal to connect to
com.six.TerminalSettings settings = new com.six.TerminalSettings();
settings.setTerminalId("12345678");

// add wanted guides (with bitwise or)
settings.setGuides(EnumSet.of(Guides.RETAIL, Guides.HOSPITALITY));

// Create terminal
com.six.Terminal terminal = new com.six.Terminal(settings);

//...

// Disconnect from terminal and clean up properly
terminal.dispose();