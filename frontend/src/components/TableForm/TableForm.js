import React from 'react';
import {
  Menu, Table, Icon, Checkbox,
} from 'semantic-ui-react';
import './TableForm.css';

export const TableForm = (props) => (
  <Table
    celled
    definition
    id="Table"
    style={{
      borderRadius: 0, width: 1050, height: 150, outline: '0.1rem solid', outlineColor: '#DEDEDF',
    }}
  >
    <Table.Header id="Header">
      <Table.Row style={{ 'font-size': '14pt' }}>
        { props.slide && <Table.HeaderCell />}
        <Table.HeaderCell id="headerTitle">Survey Title</Table.HeaderCell>
        <Table.HeaderCell id="headerAuthor">Survey author</Table.HeaderCell>
        <Table.HeaderCell id="headerResp">Survey respondant_count</Table.HeaderCell>
        <Table.HeaderCell id="headerContent">Survey content</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body id="Body">
      {props.content.map((cur) => (
        <Table.Row>
          { props.slide
          && (
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          )}
          <Table.Cell id="bodyTitle">{cur.title}</Table.Cell>
          <Table.Cell>{cur.author}</Table.Cell>
          <Table.Cell>{cur.respondant_count}</Table.Cell>
          <Table.Cell>{cur.content}</Table.Cell>
        </Table.Row>
      ))}
      {' '}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="5">
          <Menu floated="right" pagination>
            <Menu.Item as="a" icon>
              <Icon name="chevron left" />
            </Menu.Item>
            <Menu.Item as="a">1</Menu.Item>
            <Menu.Item as="a">2</Menu.Item>
            <Menu.Item as="a">3</Menu.Item>
            <Menu.Item as="a" icon>
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default TableForm;
