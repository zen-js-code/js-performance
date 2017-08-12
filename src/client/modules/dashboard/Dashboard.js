import React from 'react';
import {Container, Header, Segment, Statistic} from 'semantic-ui-react';

export default function Dashboard() {
    return (
        <div>
            <Header as="h2" attached>
                Dashboard
            </Header>
            <Segment as={Container}>
                <Statistic>
                    <Statistic.Label>Recipes</Statistic.Label>
                    <Statistic.Value>427</Statistic.Value>
                </Statistic>
            </Segment>
        </div>
    );
}
