// import { getAllDocs } from '../helpers/pouchDB';

// Retrieve Initial state from IndexDB
const getInitialState = () => {};
  /* Promise.all([ getAllDocs('users'),
                getAllDocs('clients'),
                getAllDocs('invoices'),
                getAllDocs('quotes'),
                getAllDocs('quote_resources'),
                getAllDocs('jobs'),
                getAllDocs('job_users'),
                getAllDocs('purchase_orders')])
    .then(values => ({
      contacts: values[0],
      invoices: values[1],
    }))
    .catch(err => console.log(err)); */

export { getInitialState };
