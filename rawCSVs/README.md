
Files in this folder have been sorted by app at [nodejsModule/anotherapp/]
------------------------

CONTENTS OF THIS FILE
---------------------

 * Folder Structure/Details
 * Contributing

FOLDER STRUCTURE [Folders in this directory]
----------------

* [FilesBeingSorted] Should contain a single file, loaded by the app. Don't put files here because the app will skip it(them).

* [filesToSort] Should contain all the csv files you wish to process. Make sure this folder has files before clicking process
  csv files on the app at [nodejsModule/anotherapp/]

* [MissingRID] Should contain or contains csv files with incomplete or no institution's data related to each file.

* [NonProcessed] Should contain or contains csv files that were not processed. There was no matching procedure and its price
  from the available processors (see: [nodejsModule/anotherapp/electron/Services/Algorithms] folder to contribute to this).
  Files in this folder need some work

* [ProcessedFiles] Should contain or contains files that have been processed by our app, sorted by folders. Folders are named
  after the processor/algorithm that matched its data. (see file [nodejsModule/anotherapp/electron/Services/Algorithms/Names.js])
  
* [WithErrors] Contains unknown files or badly formatted files according to our app. These files needs checking too.
                 

CONTRIBUTING
-------------

To contribute to this;
* Check if the information in the institution table is accurate and complete for files in [MissingRID] folder
* To help process the remaining non processed files in [NonProcessed] folder, write another module(algorithm)
  to help determine what values should be the procedures and their corresponding price values. Check folder
  [nodejsModule/anotherapp/electron/Services/Algorithms] for how to approach this and feed the data to the
  api responsible for populating the procedures' and logs' table.
  NOTE: make sure to copy the files you wish to test with from [NonProcessed] folder to [filesToSort] folder.
  Please check REPORT.MD in this folder
  
---------------
    DEMO
----------------
![Processing files](../nodejsModule/anotherapp/assets/git/medhack_app_gif.gif)
