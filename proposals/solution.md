# MedHack Solution Proposal

### The Process

To convert the raw CSV's to the provided standard format I would take the following steps:

- Using a python script I would recursively read each line of the CSV to check if its a header row by checking for delimition e.g comma or pipe using Regex. The script will allow for the delimeter to be specified, but the default will be a comma. Any line that is read and found not to be a header row will deleted until the header row is found.
- Once the header row has been found, the next step will be to align the file's columns to MedHack's standard format.
- I will start by identifying the required fields [itemName, hospitalId, Currency, Price] using a script that uses regex and string functions to evaluate the header row's columns
- I will then attempt to extract any additional optional fields that will be available as per the standard format.
- I will then create a column map for the raw CSV file that is aligned with MedHack's standard format
- Finally, once the column map is ready, I will proceed to generate a new file that has the data in the raw CSV in MedHack's required standard format.

### Tools & Utilities

The tools I have used before for similar tasks and ones I am likely to use inlcude:

- Bash, Awk & Sed
- Python
- PHP
- Pentaho
