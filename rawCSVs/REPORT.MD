CONTENTS OF THIS FILE :
-----------------------

 * Introduction
 * Folder structure
 * Contributing
 
 INTRODUCTION:
 -------------
 Files in this folder are now sorted accordingly after passing through
 the **processors** in `nodejsModule/anotherapp`. They are sorted
 with what they lack/miss or if they go all the details needed.
 See below for what each folder contains.
 
 FOLDER STRUCTURE:
 ----------------
 * [FilesBeingSorted] : contains the file the app is working on at the current state.
 * [filesToSort] : This is where you put all the files you wish to process before running the app.
 * [MissingRID] : Files in this folder could be in the [ProcessedFiles] folder but lack details
 like rId, hospital name and such (lack institution data)
 * [NonProcessed] : Files that have not yet been matched by the available processors/algorithm,
 i.e. procedure and it's matching price have yet to be determined.
 Inside this folder, there's another folder named [HumanError] and contains files that don't
 match the details in the institution table. The price key and the procedure keys are wrong and
 should be corrected.
 * [WithErrors] : Files that are unconverted or in wrong formats.
 
 CONTRIBUTING:
 -------------
 To contribute;
 * Files in the folder [MissingRID] need their corresponding institution data, check `institutions_latest.sql`
 in the [SQLs] folder of this project and update accordingly.
 
 * Files in the folder [NonProcessed/HumanError] need to have their price key and procedure key
 matching with the one in the institution table (`institutions_latest.sql`). Please update
 
 That's all that is remaining for the files in the above folders.
 
 * Files in the folder [NonProcessed], (not in any folder inside that), need another processor(s)
 to match what their data(values) hold i.e procedure and it's matching price value.
 
 To contribute to this, that is; write new functions/modules that go through the data in the files
 and match procedure to it's price, check README.MD in [nodejsModule/anotherapp/electron/Services/Algorithms]
 