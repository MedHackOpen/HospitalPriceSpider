## This folder contains project SQL files

##File names (active files)
* institutions_latest.sql // Latest institutions items
* procedures.zip // Latest procedures items (unzip)
* logs.sql // Latest logs after importing procedures data into the procedures table


UNDERSTANDING THE LOGS.sql
---------------------------
    This files holds details about each file that has been processed, and have been found to have
    a procedure and it's corresponding price value and key (atleast 1 record or more).
    Each file has it's own row;  Rows with null rId/hospitalName means that the file could have been
    processed (it's data loaded into procedures' table) but was NOT because the file's institution
    data is missing or incomplete. These files are in [rawCSVs/MissingRID] folder. If you're contributing
    to this repo, that would be a good place to start. Please check the README.MD and REPORT.MD in the
    rawCSVs folder.