/* --- Create list -------------------------------------------------- */
ta_object_t myList = ta_object_invalid;
ta_list_create(&amp;myList);

/* --- Add an integer ----------------------------------------------- */
// Create an object of type integer, since list can only contain
// ta_object_t-instances
ta_object_t myInteger = ta_object_invalid;
ta_integer_create(&amp;myInteger, 1234);
ta_list_add(myList, myInteger);

// Important: User must release the integer-object. Either now or later.
ta_object_release(myInteger);

/* --- Get size of list --------------------------------------------- */
size_t myListSize;
ta_list_get_count(myList, &amp;myListSize);

/* --- Receive first element of list -------------------------------- */
ta_object_t myListElement = ta_object_invalid;
ta_list_get_at(myList, 0, &amp;myListElement);

// do something with element...
// - user is responsible to know how to read /
//   process retreived objects from list
// - in our case here it`s an integer-object
int64_t myIntValue = 0;
ta_integer_get_value(myListElement, &amp;myIntValue);
printf(&quot;MyIntValue: %Id\n&quot;, myIntValue);

// Important:
// - The list returns list elements as not retained!
// - List element must not be released!

/* --- Release list ------------------------------------------------- */
ta_object_release(myList);

// - At this point, myListElement is no longer (reliably) accessible.
//   Since list has been released, all its elements have been released
//   as well, if no one else is retaining the list elements.

// - If user still wants to use myListElement, he needs to call
//   ta_object_retain(myListElement) right after receiving it from
//   the list. In this case, he later needs to release the list
//   element with ta_object_release(myListElement).