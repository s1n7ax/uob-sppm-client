import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageContentArea from './PageContentArea';
import { ImSearch } from 'react-icons/im';
//import { H1 } from './Title';
import { useState } from 'react';
import styled from 'styled-components';

const PaginationPageCountSelect = styled.div`
  width: 5em;
`;

const TableControlContainer = styled.div`
  width: 100%;

  margin: 1em 0 1em 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 30em;
`;

function TableOfContent({ title, headers, body, searchFilter }) {
  let [paginationRecordCount, setPaginationRecordCount] = useState(5);
  let [paginationSelectedPage, setPaginationSelectedPage] = useState(1);
  let [searchCriteria, setSearchCriteria] = useState('');

  if (searchCriteria)
    body = body.filter((row) => {
      return searchFilter(searchCriteria, row);
    });

  let getPaginationPageCount = (recordCount) => {
    recordCount = recordCount ?? paginationRecordCount;

    return parseInt(
      body.length / recordCount + (body.length % recordCount > 0 ? 1 : 0)
    );
  };

  let paginationRecordCountChange = (ev) => {
    let value = parseInt(ev.target.value);
    setPaginationRecordCount(value);

    // when changing from lesser record count to higher, selected page should be
    // change to the last page that has values
    setPaginationSelectedPage(
      paginationSelectedPage > getPaginationPageCount(value)
        ? getPaginationPageCount(value)
        : paginationSelectedPage
    );
  };

  let paginationSelectedPageChange = (ev) => {
    let value = parseInt(ev.target.text);

    if (isNaN(value)) return;

    setPaginationSelectedPage(value);
  };

  let items = [];

  for (let number = 1; number <= getPaginationPageCount(); number++) {
    items.push(
      <Pagination.Item
        onClick={paginationSelectedPageChange}
        key={number}
        active={number === paginationSelectedPage}
      >
        {number}
      </Pagination.Item>
    );
  }

  let pageList = (() => {
    let end = paginationSelectedPage * paginationRecordCount;
    let start = end - paginationRecordCount;

    return body.slice(start, end);
  })();

  let rows = pageList.map((record, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{record.name}</td>
        <td>{record.amount + ' Rs'}</td>
        <td>{record.duration + 'h'}</td>
      </tr>
    );
  });

  return (
    <PageContentArea>
      {/* TITLE */}
      {/*<H1 title={title}></H1>*/}

      {/* PAGINATION SELECT */}
      <TableControlContainer>
        <PaginationPageCountSelect>
          <Form.Control
            as="select"
            defaultValue={paginationRecordCount}
            onChange={paginationRecordCountChange}
          >
            <option value="5">5</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Control>
        </PaginationPageCountSelect>
        <SearchContainer color="secondary">
          <InputGroup color="secondary">
            <FormControl
              onChange={(ev) => setSearchCriteria(ev.target.value)}
              aria-describedby="basic-addon1"
              color="secondary"
              variant="secondary"
            />
            <InputGroup.Prepend color="secondary">
              <Button variant="outline-secondary">
                <ImSearch />
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
        </SearchContainer>
      </TableControlContainer>

      {/* TABLE */}
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      {/* PAGINATION SELECTIONS */}
      <Pagination>{items}</Pagination>
    </PageContentArea>
  );
}

export default TableOfContent;
