ta_object_t terminal = ta_object_invalid;
ta_object_t settings = ta_object_invalid;

// create terminal settings instance
ta_terminal_settings_create(&amp;settings);

// add wanted guides (with bitwise or)
ta_terminal_settings_set_guides(settings, ta_c_guide_retail | ta_c_guide_dialog);

// create terminal
ta_terminal_create(&amp;terminal, settings);

// release terminal settings
ta_object_release(settings);

//...

// in the end release terminal as well
ta_oject_release(terminal);