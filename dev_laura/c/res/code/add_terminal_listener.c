/*
 * Example for adding a terminal status listener
 *
 * \param[in] terminal Terminal instance
 */
void add_status_listener(ta_object_t terminal) {
    ta_object_t listener = ta_object_invalid;
    ta_s_terminal_listener_t listener_config;

    // clear listener-config
    memset(&amp;listener_config, 0, sizeof(listener_config));

    // add user-implemented callback to listener-config
    listener_config.terminal_status_changed = mylistener_terminal_status_changed;

    // optional: add user content to listener,
    // pointer will be handed over to all callbacks:
    //listener_config.user_pointer = &amp;custom_struct;

    // create listener-object
    ta_terminal_listener_create(&amp;listener, &amp;listener_config);

    // add listener-object to terminal
    ta_terminal_add_listener(terminal, listener);

    // release listener-object
    ta_object_release(listener);
}

/*
 * Callback for terminal status changes
 *
 * Will be called when status of terminal changes.
 * \param[in] terminal Terminal instance
 * \param[in] user_pointe User-pointer which can be set in the terminal listener
 */
void mylistener_terminal_status_changed(ta_object_t terminal,	void *user_pointer) {

	// implement your code to process status change here...
	//printf(&quot; &gt; listener_terminal_status_changed\n&quot;);
}