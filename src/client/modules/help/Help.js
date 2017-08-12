import React from 'react';
import {Container, Header, Segment, Table} from 'semantic-ui-react';

export default function Help() {
    return (
        <div>
            <Header as="h2" attached>
                Help
            </Header>
            <Segment as={Container}>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Command</Table.HeaderCell>
                            <Table.HeaderCell>Shortcut</Table.HeaderCell>
                            <Table.HeaderCell>Descriptions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Create New</Table.Cell>
                            <Table.Cell>Ctrl + N</Table.Cell>
                            <Table.Cell>Create new recipe</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Search</Table.Cell>
                            <Table.Cell>Ctrl + F</Table.Cell>
                            <Table.Cell>Search for a recipe</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Segment>
        </div>
    );
}
