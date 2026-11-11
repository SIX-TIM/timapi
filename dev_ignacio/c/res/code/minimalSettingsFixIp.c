ta_object_t terminal = ta_object_invalid;
ta_object_t settings = ta_object_invalid;
ta_object_t terminal_ip = ta_object_invalid;

ta_terminal_settings_create(&amp;settings);
ta_string_format(&amp;terminal_ip, "%s", "192.168.1.10");
ta_terminal_settings_set_connection_ip_string(settings, terminal_ip);
ta_terminal_settings_set_connection_mode(settings, ta_c_cm_on_fix_ip);
ta_terminal_create(&amp;terminal, settings);

ta_object_release(terminal_ip);
ta_object_release(settings);
