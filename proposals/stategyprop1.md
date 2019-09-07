# Strategy for record standardizing script

This readme describes my approach to standardizing the records to json for all record within rawcsv directory.

## Procedures

- Study the .csv files to find header patterns and build headers column dictionary map.
- Initialize json fields based on medhacks required field per hospital.
- For each .csv record, extract hospital name
    - For each row in record using either direct field read and/or regular expressions to fill required field excluding average, median and fields requiring statiscal computations.
- On first phase completion, parse all records and compute statistical values.
- Inspect outputs and update data extraction template.
