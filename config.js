const contractor = {
  contractorLine1: 'John Doe',
  contractorLine2: 'Steet Address',
  contractorLine3: 'Tax ID: 123',
};

const client1 = {
  clientLine1: 'Client Name',
  clientLine2: 'Client Address',
  clientLine3: 'Tax ID: 123',
};

const clientConfig = {
  contractDate: '07.05.2018',
  hWorkedMonth: 168,
  ...contractor,
  ...client1,
}

const basicConfig = {
  consultingH: '',
  meetingsH: '',
  ratePerH: '',
  rateCurrency: '',
  copyrightPercentage: '',
};

function generate() {
  const invoices = [
    {
      invoiceMonth: 'Styczeń 2019',
      rateCurrency: 'USD',
      ratePerH: 100,
      meetingsH: 8,
      additionalRowTitle: 'Zwrot kosztu podróży',
      additionalRowValue: '123',
    },
    {
      invoiceMonth: 'Luty 2019',
      rateCurrency: 'USD',
      ratePerH: 90,
      meetingsH: 6,
    },
  ];
  const pages = invoices.map((page) => ({
    ...basicConfig,
    ...clientConfig,
    ...page,
  }));
  return pages;
}

const PAGES = generate();

module.exports = {
  PAGES,
};
