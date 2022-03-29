# IP BOX report generator

This script generates IP BOX reports in PDF format based on supplied array of
data.


# How to use

1. Clone the repo
2. Edit [config.js](/config.js) file so it generates `PAGES` array with items of
   structure like:
   ```js
   {
    meetingsH: 8,
    ratePerH: 10,
    rateCurrency: 'USD',
    contractDate: '01.01.2019',
    hWorkedMonth: 168,
    contractorLine1: 'John Doe',
    contractorLine2: 'Street Address',
    contractorLine3: 'Tax ID: 123',
    clientLine1: 'Client Name',
    clientLine2: 'Client Address',
    clientLine3: 'Tax ID: 123',
    invoiceMonth: 'Styczeń 2019',
    additionalRowTitle: 'This is optional (like zwrot kosztu podróży)',
    additionalRowValue: '123 (also optional)',
   }
   ```
3. Run `node index.js`
4. The files will get generated into output/ directory



# Preview

[Example output file](/example.pdf)

