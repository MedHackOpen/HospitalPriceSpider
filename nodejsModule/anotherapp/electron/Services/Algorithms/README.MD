CONTENTS OF THIS FILE
---------------------

 * Introduction
 * File structure and Contributing

 Introduction :
-----------------
This folder is responsible for processing raw json data (objects/items) and returning
that to our main process. The information returned is used to sort the files as well
as populate the procedures and logs table if the required data is matched

File structure and Contributing :
---------------------------------
* Current processors/modules: ByHuman.js and ByKeyName.js

* Names.js : Contains the names of all available processors, add yours and create the same file
in this directory.
* To use your named module to process the csv files, first import it in JsonDataBridge.js (see lines 5 and 6)
of the same file. Then in the function MatchedItems(), check if the name matched your module name and then
assign the matched object to be what's returned by your module. See lines 55 and 62 of the same file.
That's the processor api.

NOTE: edit only Names.js to add your module name, and JsonDataBridge.js to call and use your module/processor.
See ByHuman.js and ByKeyName.js of what you should return the look similar.

Procedure or price should contain the key and value for each returned as an json string/ or null.
Please use ByHuman.js and ByKeyName.js as examples
 `item = {
          procedure,
          price,
      }
  
      return JSON.stringify(item)`
