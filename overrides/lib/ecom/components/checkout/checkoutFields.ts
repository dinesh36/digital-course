const personalFieldNames = ['firstName', 'lastName', 'phone'];

// The checkout form shows the name and phone under "Personal Information" and the rest under "Billing Address";
// the default-address checkbox of the address book has no place in it.
export const getPersonalDetails = (fields: any[], colSpan: number) => fields
  .filter((f: any) => personalFieldNames.includes(String(f.name)))
  .map((f: any) => (f.name === 'firstName' || f.name === 'lastName' ? { ...f, colSpan } : { ...f }));

export const getBillingDetails = (fields: any[], colSpan: number) => fields
  .filter((f: any) => !personalFieldNames.includes(String(f.name)) && f.name !== 'isDefaultBilling')
  .map((f: any) => (f.name === 'city' || f.name === 'state' ? { ...f, colSpan } : { ...f }));
