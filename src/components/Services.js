import TableOfContent from './TableOfContent';

function Services() {
  let headers = ['No', 'Name', 'Amount', 'Max Duration'];

  let body = [
    { name: 'Testing', amount: 1017, duration: 1 },
    { name: 'Testing', amount: 1007, duration: 1 },
    { name: 'Testing', amount: 1014, duration: 1 },
    { name: 'Testing', amount: 1028, duration: 1 },
    { name: 'Testing', amount: 1020, duration: 1 },
    { name: 'Testing', amount: 1041, duration: 1 },
    { name: 'Testing', amount: 1015, duration: 1 },
    { name: 'Testing', amount: 1058, duration: 1 },
    { name: 'Testing', amount: 1021, duration: 1 },
    { name: 'Testing', amount: 1023, duration: 1 },
    { name: 'Srinesh', amount: 1034, duration: 1 },
    { name: 'Testing', amount: 1035, duration: 1 },
    { name: 'Testing', amount: 1019, duration: 1 },
    { name: 'Testing', amount: 1022, duration: 1 },
    { name: 'Testing', amount: 1024, duration: 1 },
    { name: 'Testing', amount: 1017, duration: 1 },
  ];

  let searchFilter = (value, row) => {
    return row.name.toLowerCase().includes(value.toLowerCase());
  };

  return (
    <TableOfContent
      title="Services"
      headers={headers}
      body={body}
      searchFilter={searchFilter}
    />
  );
}

export default Services;
