ta_object_t terminal = ta_object_invalid;
ta_object_t settings = ta_object_invalid;
ta_object_t terminal_id = ta_object_invalid;

ta_terminal_settings_create(&amp;settings);
ta_string_format(&amp;terminal_id, "%s", "12345678");
ta_terminal_settings_set_terminal_id(settings, terminal_id);
ta_terminal_settings_set_connection_mode(settings, ta_c_cm_broadcast);
ta_terminal_create(&amp;terminal, settings);

ta_object_release(terminal_id);
ta_object_release(settings);
