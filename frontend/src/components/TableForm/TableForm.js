import React from 'react'
import {
  Menu, Table, Icon, Checkbox, 
} from 'semantic-ui-react';

export const TableForm = (props) => {
  console.log(props.content)
  return(
    <Table
          celled
          definition
          style={{
            borderRadius: 0, width: 1300, height: 150, outline: '0.1rem solid', outlineColor: '#DEDEDF',
          }}
        >
          <Table.Header>
            <Table.Row style={{ 'font-size': '20pt' }}>
              <Table.HeaderCell />
              <Table.HeaderCell>Survey Title</Table.HeaderCell>
              <Table.HeaderCell>Survey author</Table.HeaderCell>
              <Table.HeaderCell>Survey respondant_count</Table.HeaderCell>
              <Table.HeaderCell>Survey content</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.content.map((cur) => (
              <Table.Row>
              <Table.Cell collapsing>
                <Checkbox slider />
              </Table.Cell>
              <Table.Cell>{cur.title}</Table.Cell>
              <Table.Cell>{cur.author}</Table.Cell>
              <Table.Cell>{cur.respondant_count}</Table.Cell>
              <Table.Cell>{cur.content}</Table.Cell>
            </Table.Row>
              ))}
            {' '}
            <br />
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
  )
}

export default TableForm